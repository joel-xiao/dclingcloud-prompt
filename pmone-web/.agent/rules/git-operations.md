# Git 操作规范

## 提交推送流程

执行前必须先 `git status` 确认当前状态。

### 场景一：工作区有未暂存改动或 untracked 文件

1. `git commit -m "xxx"` 提交暂存区内容
2. `git stash -u` 保存剩余工作区改动（包括 untracked 新文件）
3. `git pull --rebase` 拉取远程最新代码
4. 如果 rebase 有冲突，立即告知用户，不要自行解决，等用户处理完再继续
5. `git push`
6. `git stash pop` 恢复工作区
7. 如果 stash pop 有冲突，立即告知用户，不要自行解决

### 场景二：工作区干净（无未暂存改动）

1. `git commit -m "xxx"` 提交暂存区内容
2. `git pull --rebase`
3. 如果 rebase 有冲突，立即告知用户，不要自行解决，等用户处理完再继续
4. `git push`

## 禁止事项

- 禁止使用 `git stash --keep-index`，会导致 commit 后 pop 产生 `both added` 冲突
- 禁止跳过 `git status` 直接操作
- 禁止自行解决任何冲突（rebase 冲突、stash pop 冲突），必须交给用户处理
