param(
  [string]$RepoRoot = (Split-Path -Parent $PSScriptRoot),
  [switch]$FailIfOutdated
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

$RepoRoot = (Resolve-Path $RepoRoot).Path
$SourceRoot = Resolve-SourceRoot -RepoRootPath $RepoRoot

$chapterDirs = Get-ChildItem -LiteralPath $SourceRoot -Directory |
  Where-Object { $_.Name -like "chapter-*" } |
  Sort-Object Name

$homePage = Get-Item -LiteralPath (Join-Path $RepoRoot "index.html")
$notesPage = Get-Item -LiteralPath (Join-Path $RepoRoot "notes\\index.html")

$rows = foreach ($chapter in $chapterDirs) {
  $sourceIndexPath = Join-Path $chapter.FullName "index.html"
  $targetIndexPath = Join-Path $RepoRoot ($chapter.Name + "\\index.html")

  $sourceIndex = Get-Item -LiteralPath $sourceIndexPath
  $targetExists = Test-Path $targetIndexPath
  $targetIndex = if ($targetExists) { Get-Item -LiteralPath $targetIndexPath } else { $null }

  $needsSync = (-not $targetExists) -or ($sourceIndex.LastWriteTime -gt $targetIndex.LastWriteTime)
  $notesMayBeStale = $sourceIndex.LastWriteTime -gt $notesPage.LastWriteTime
  $homeMayBeStale = $sourceIndex.LastWriteTime -gt $homePage.LastWriteTime

  [pscustomobject]@{
    Chapter            = $chapter.Name
    SourceUpdated      = $sourceIndex.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss")
    LocalCopyUpdated   = if ($targetExists) { $targetIndex.LastWriteTime.ToString("yyyy-MM-dd HH:mm:ss") } else { "MISSING" }
    NeedsSync          = if ($needsSync) { "YES" } else { "NO" }
    NotesIndexStale    = if ($notesMayBeStale) { "POSSIBLE" } else { "NO" }
    HomePageStale      = if ($homeMayBeStale) { "POSSIBLE" } else { "NO" }
  }
}

$rows | Format-Table -AutoSize

$outdated = @($rows | Where-Object { $_.NeedsSync -eq "YES" })
if ($outdated.Count -gt 0) {
  Write-Host ""
  Write-Host "Detected chapter updates in source-site that have not been copied into SHENAO1.github.io yet." -ForegroundColor Yellow
  Write-Host "Run: .\\scripts\\sync-from-source.ps1" -ForegroundColor Yellow
  if ($FailIfOutdated) {
    exit 1
  }
}
else {
  Write-Host ""
  Write-Host "All copied chapter pages are up to date." -ForegroundColor Green
}
