param(
  [string]$RepoRoot = (Split-Path -Parent $PSScriptRoot),
  [string]$SourcePath = $null,
  [string]$DestSubPath = $null
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Resolve-SourceRoot {
  param([string]$RepoRootPath)

  $linkedPath = Join-Path $RepoRootPath "source-site"
  if (Test-Path $linkedPath) {
    return (Resolve-Path $linkedPath).Path
  }

  $fallback = Join-Path (Split-Path $RepoRootPath -Parent) "BeiDouGPS_LuYu_note\\site"
  if (Test-Path $fallback) {
    return (Resolve-Path $fallback).Path
  }

  throw "Source site was not found. Expected 'source-site' or '$fallback'."
}

function Copy-SiteItem {
  param(
    [string]$SourcePath,
    [string]$TargetPath
  )

  # Check if source is a file or a directory
  if (Test-Path $SourcePath -PathType Leaf) {
    # It's a file, copy with overwrite
    $parentDir = Split-Path -Parent $TargetPath
    if (-not (Test-Path $parentDir)) {
      New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
    }
    Copy-Item -LiteralPath $SourcePath -Destination $TargetPath -Force
    Write-Host "Copied file: $SourcePath -> $TargetPath" -ForegroundColor Gray
  } else {
    # It's a directory, perform incremental merge (do NOT delete target directory)
    if (-not (Test-Path $TargetPath)) {
      New-Item -ItemType Directory -Path $TargetPath -Force | Out-Null
    }

    # Recursively copy all files
    Get-ChildItem -LiteralPath $SourcePath -Recurse | Where-Object { -not $_.PSIsContainer } | ForEach-Object {
      $relativePath = $_.FullName.Substring($SourcePath.Length + 1)
      $targetFile = Join-Path $TargetPath $relativePath
      $targetDir = Split-Path -Parent $targetFile
      if (-not (Test-Path $targetDir)) {
        New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
      }
      Copy-Item -LiteralPath $_.FullName -Destination $targetFile -Force
    }
    Write-Host "Merged directory: $SourcePath -> $TargetPath" -ForegroundColor Gray
  }
}

$RepoRoot = (Resolve-Path $RepoRoot).Path

# If both SourcePath and DestSubPath are provided, perform a targeted sync of that folder/file
if ($SourcePath -and $DestSubPath) {
  $resolvedSource = (Resolve-Path $SourcePath).Path
  $resolvedTarget = Join-Path $RepoRoot $DestSubPath
  
  if (-not (Test-Path $resolvedSource)) {
    throw "Specified SourcePath not found: $resolvedSource"
  }
  
  Write-Host "Performing targeted incremental sync..." -ForegroundColor Cyan
  Copy-SiteItem -SourcePath $resolvedSource -TargetPath $resolvedTarget
  Write-Host "Successfully synced '$resolvedSource' to '$resolvedTarget' incrementally." -ForegroundColor Green
  exit 0
}

# Otherwise, perform standard sync from resolved SourceRoot
$SourceRoot = if ($SourcePath) {
  (Resolve-Path $SourcePath).Path
} else {
  Resolve-SourceRoot -RepoRootPath $RepoRoot
}

Write-Host "Synchronizing from source: $SourceRoot" -ForegroundColor Cyan

# 1. Sync fixed items if they exist in source
$fixedItems = @(
  "index.html",
  ".nojekyll",
  "assets",
  "notes",
  "video-notes"
)

foreach ($item in $fixedItems) {
  $srcPath = Join-Path $SourceRoot $item
  if (Test-Path $srcPath) {
    Copy-SiteItem -SourcePath $srcPath -TargetPath (Join-Path $RepoRoot $item)
  } else {
    Write-Host "Skipped fixed item (not found in source): $item" -ForegroundColor DarkGray
  }
}

# 2. Sync any subdirectories in SourceRoot that are not in fixed items and do not start with a dot
$customDirs = Get-ChildItem -LiteralPath $SourceRoot -Directory |
  Where-Object { $_.Name -notin $fixedItems -and $_.Name -notlike ".*" }

foreach ($dir in $customDirs) {
  Copy-SiteItem -SourcePath $dir.FullName -TargetPath (Join-Path $RepoRoot $dir.Name)
}

Write-Host "Synced site content from '$SourceRoot' into '$RepoRoot' incrementally (Non-destructive)." -ForegroundColor Green
