param(
  [string]$RepoRoot = (Split-Path -Parent $PSScriptRoot)
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

  if (Test-Path $TargetPath) {
    Remove-Item -LiteralPath $TargetPath -Force -Recurse
  }

  Copy-Item -LiteralPath $SourcePath -Destination $TargetPath -Force -Recurse
}

$RepoRoot = (Resolve-Path $RepoRoot).Path
$SourceRoot = Resolve-SourceRoot -RepoRootPath $RepoRoot

$fixedItems = @(
  "index.html",
  ".nojekyll",
  "assets",
  "notes",
  "video-notes"
)

foreach ($item in $fixedItems) {
  Copy-SiteItem -SourcePath (Join-Path $SourceRoot $item) -TargetPath (Join-Path $RepoRoot $item)
}

$chapterDirs = Get-ChildItem -LiteralPath $SourceRoot -Directory |
  Where-Object { $_.Name -like "chapter-*" }

foreach ($chapter in $chapterDirs) {
  Copy-SiteItem -SourcePath $chapter.FullName -TargetPath (Join-Path $RepoRoot $chapter.Name)
}

Write-Host "Synced site content from '$SourceRoot' into '$RepoRoot'." -ForegroundColor Green
