## 【VSCode】插件及配置导入导出指南

https://blog.csdn.net/qq_23398705/article/details/148660167

文章目录
@[toc]
**一、导出插件列表**
**方法 1：命令行导出（推荐）**
**方法 2：复制已安装插件**
**二、导入插件列表**
**三、导出配置（设置、快捷键、代码片段等）**
**核心配置文件路径**
**操作步骤**
**四、导入配置**
**五、自动同步（官方设置同步）**
**启用官方同步**
**在新设备恢复**
**六、高级方案：配置文件同步**
**1. 使用 Settings Sync 插件（旧版方法，官方同步推出前流行）**
**2. 版本控制（Git）**
**常见问题**
一、导出插件列表
方法 1：命令行导出（推荐）
打开终端（VS Code 终端或系统终端）
执行命令生成插件列表文件：
code --list-extensions > extensions.txt

文件 extensions.txt 会保存在当前目录下，包含所有已安装插件的 ID。
方法 2：复制已安装插件
在 VS Code 中打开扩展视图（Ctrl+Shift+X）
搜索 @installed 查看所有已安装插件
手动记录插件名称（如 ms-python.python）
二、导入插件列表
将 extensions.txt 文件复制到新机器
在终端执行批量安装命令：
FOR /F "tokens=*" %i IN (extensions.txt) DO code --install-extension "%i"

三、导出配置（设置、快捷键、代码片段等）
核心配置文件路径
配置类型	文件路径（用户目录）
全局设置	%APPDATA%\Code\User\settings.json (Win)
~/.config/Code/User/settings.json (Linux/macOS)
键盘快捷键	keybindings.json（同目录）
代码片段	snippets/*.json（同目录下 snippets 文件夹）
工作区配置	项目根目录 .vscode/settings.json
操作步骤
打开用户配置目录：
Windows：按 Win+R 输入 %APPDATA%\Code\User
macOS/Linux：终端输入 open ~/.config/Code/User/
备份整个 User 文件夹（或至少备份以下文件）：
settings.json（设置）
keybindings.json（快捷键）
snippets/（代码片段目录）
state.vscdb（UI 状态，可选）
profiles.json（多配置文件，可选）
四、导入配置
将备份的配置文件复制到新机器的用户目录（路径同上）
覆盖现有文件（建议先备份原始文件）
重启 VS Code 生效
五、自动同步（官方设置同步）
启用官方同步
点击 VS Code 左下角齿轮图标 > “打开设置同步”
选择登录方式（Microsoft/GitHub 账户）
选择要同步的内容：
设置
快捷键
代码片段
扩展插件
UI 状态
同步自动在后台运行
在新设备恢复
登录同一账户
同步自动拉取配置和插件
冲突时会提示解决方式
六、高级方案：配置文件同步
1. 使用 Settings Sync 插件（旧版方法，官方同步推出前流行）
安装 Settings Sync 插件
按 Ctrl+Shift+P 输入 Sync: Update / Upload Settings 生成 Gist ID
在新机器：Sync: Download Settings + 输入 Gist ID
2. 版本控制（Git）
将 User 目录添加到 Git 仓库
cd ~/.config/Code/User
git init
git add settings.json keybindings.json snippets/
git commit -m "Backup VS Code config"
AI写代码
bash
1
2
3
4
推送至 GitHub/私有仓库
新设备克隆仓库并替换文件
常见问题
插件安装失败：

检查网络是否可访问 marketplace.visualstudio.com
确认插件 ID 拼写正确（参考 extensions.txt）
配置不生效：

检查文件路径是否正确
重启 VS Code
检查工作区设置是否覆盖用户设置（.vscode/settings.json）
同步冲突：

官方同步：手动选择保留本地或远程版本
Git：手动合并冲突
通过以上步骤，您可以在不同设备间快速迁移 VS Code 的完整开发环境。推荐优先使用官方设置同步功能，简单高效。

突**：

官方同步：手动选择保留本地或远程版本
Git：手动合并冲突
通过以上步骤，您可以在不同设备间快速迁移 VS Code 的完整开发环境。推荐优先使用官方设置同步功能，简单高效。
