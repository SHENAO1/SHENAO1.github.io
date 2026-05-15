# SHENAO1.github.io

这是本地的 GitHub Pages 仓库目录，路径是 `E:\Code\SHENAO1.github.io`。

当前结构分成两部分：

- 仓库根目录里的 `index.html`、`notes/`、`assets/`、`chapter-*` 是可直接部署到 GitHub Pages 的静态副本。
- 本地联接 `source-site/` 指向 `E:\Code\BeiDouGPS_LuYu_note\site`，只用于你本机检查更新和同步，不会提交到 GitHub。

## 本地同步流程

先检查源笔记有没有更新：

```powershell
.\scripts\check-note-updates.ps1
```

如果源站点更新了，再把副本同步到这个仓库：

```powershell
.\scripts\sync-from-source.ps1
```

## 部署

仓库已经包含 GitHub Pages Actions workflow：

- `.github/workflows/deploy-pages.yml`

把这个目录作为独立仓库推到 GitHub 后，Pages 可以直接从仓库根目录发布。

## 说明

严格的 Windows 软链接需要管理员权限；当前环境下已改用目录联接（junction）作为本地替代，效果上足够满足“跟随源目录更新”的需求。
