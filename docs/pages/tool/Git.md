# 初始化仓库

~~~bash
git init
~~~

- **作用**
  将当前目录转换为 Git 仓库，创建隐藏的 `.git` 目录（存储版本历史、配置等）。
- **深入场景**
  - 将已有项目纳入 Git 管理：在需要版本控制的项目的根目录执行 `git init`。
  - 重新初始化仓库：删除 `.git` 文件夹后再次运行 `git init`（慎用，会丢失历史记录）。
- **注意事项**
  - 初始化后需通过 `git add` 和 `git commit` 提交初始文件。
  - 使用 `git init --bare` 创建“裸仓库”（无工作区，常用于远程服务器）。

# 克隆仓库

~~~bash
git clone [远程仓库Url]
~~~

- **作用**
  完整复制远程仓库到本地，包括**所有**历史记录和分支。
- **参数扩展**
  - `git clone [url] [directory]`：指定本地目录名。
  - `git clone --branch [branch-name] [url]`：克隆特定分支。
- **协议支持**
  - HTTPS：`https://github.com/user/repo.git`
  - SSH：`git@github.com:user/repo.git`
  - Git：`git://github.com/user/repo.git`
- **技巧**
  - 克隆后自动进入仓库目录（默认与远程仓库同名）。

# 状态查看

~~~bash
git status
~~~

- **关键状态**
  - **Untracked**：文件未被 Git 跟踪。
  - **Modified**：文件已修改但未暂存。
  - **Staged**：文件已暂存，等待提交。
- **进阶用法**
  - `git status -s`：简洁模式（标记文件状态，如 `M` 修改、`??` 未跟踪）。
  - `git status --ignored`：显示被忽略的文件（需配合 `.gitignore`）。

# 基本操作

## 将修改添加到暂存区

~~~bash
# 指定文件
git add [文件名]
# 全部文件
git add .
~~~

- **暂存区作用**
  将文件的当前版本“快照”保存到暂存区，为提交做准备。
- **灵活操作**
  - `git add -p`：交互式选择部分修改内容暂存（分块提交）。
  - `git add -u`：仅添加已跟踪文件的修改（不包含新文件）。
- **忽略文件**
  - 使用 `.gitignore` 文件排除日志、临时文件等（如 `*.log`, `node_modules/`）。
  - 全局忽略：`git config --global core.excludesfile ~/.gitignore_global`。

## 提交修改

~~~bash
git commit -m "修改日志"
~~~

- **提交信息规范**
  - 第一行简短描述（如 `feat: Add login function`）。
  - 空一行后详细说明（可选）。
  - 遵循约定式提交（Conventional Commits）。
- **修复提交**
  - `git commit --amend`：修改最后一次提交（如修正信息或补充文件）。
  - `git reset HEAD~1`：撤销最后一次提交（慎用，需重新暂存文件）。
- **自动关联修改**
  - `git commit -a -m "message"`：跳过 `git add`，直接提交所有已跟踪文件的修改。

## 查看提交日志

~~~bash
git log
~~~

- **常用参数**
  - `git log --oneline`：单行显示提交信息。
  - `git log -p`：显示具体修改内容。
  - `git log --graph`：图形化分支合并历史。
  - `git log --author="name"`：按作者筛选提交。
- **查找内容**
  - `git log -S "keyword"`：搜索包含关键字的提交。
  - `git log --since="2023-01-01"`：按时间筛选。
- **查看差异**
  - `git diff`：比较工作区和暂存区。
  - `git diff --staged`：比较暂存区和最新提交。

# 分支操作

## 基础操作

~~~bash
# 列出所有分支（-a 显示远程分支）
git branch

# 删除分支（需合并后才能删除）
git branch -d [branch]

# 强制删除未合并分支
git branch -D [branch]

# 创建并切换分支
git checkout -b [branch]
~~~

## 合并与冲突

- **合并策略**
  - **Fast-forward**：当前分支无新提交时直接移动指针。
  - **Recursive**：生成合并提交（需解决冲突）。
- **解决冲突**
  1. 手动编辑冲突文件（标记为 `<<<<<<<`、`=======`、`>>>>>>>`）， 使用notepadfree之类的工具手动解决即可
  2. `git add` 标记已解决的文件。
  3. `git commit` 完成合并。

# 远程仓库操作

## git remote

- `git remote -v`：查看远程仓库地址。
- `git remote add [name] [url]`：添加远程仓库（默认 `origin`）
- `git remote remove [name]`：删除远程仓库关联

## git pull

- `git pull` 命令用于从远程仓库获取最新的更改，并自动尝试将其合并到当前分支中
- 相当于 `git fetch` 和 `git merge` 的组合：首先它会获取远程仓库的所有更新（`fetch`），然后尝试将这些更新合并到本地代码库中（`merge`）

~~~bash
git pull [远程仓库] [远程分支]
~~~

- 将 远程仓库：远程分支 拉取到当前所在的本地分支
- 如果省略 `[remote]` 和 `[branch]`，Git 会使用默认的远程仓库（通常是 `origin`）和当前所在的分支

## git push

### 将<本地分支>推到<远程主机>的<远程分支>上，如果<远程分支>不存在则自动创建

~~~bash
git push <远程主机名> <本地分支名>:<远程分支名>
~~~

### 如果省略远程分支名，则表示将本地分支推送与之存在"追踪关系"的远程分支（通常两者同名），如果该远程分支不存在，则会被新建

~~~bash
# 把本地master分支推送到远程仓库的master分支
git push origin master
~~~

### 如果省略本地分支名，则表示删除指定的远程分支，因为这等同于推送一个空的本地分支到远程分支

~~~bash
git push origin :master
# 等同于 表示删除origin主机的master分支
git push origin --delete master
~~~

### 如果当前分支与远程分支之间存在追踪关系，则本地分支和远程分支都可以省略

~~~bash
git push origin
~~~

### 如果当前分支只有一个追踪分支，主机名也可以省略

~~~bash
git push
~~~

### 如果当前分支有多个追踪分支，可以使用`-u`选项指定一个默认主机，之后就可以直接使用`git push`了

~~~ bash
# 将本地的master分支推送到origin主机，同时指定origin为默认主机
git push -u origin master
~~~

