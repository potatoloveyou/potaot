~~~tex
(1)命令行查看版本号
git --version

(2)初始化git仓库（当前目录）（此时当前文件夹下会多出一个隐藏目录 .git）
git init   

(3)配置身份
git config --global user.name potato(用户名)
git config --global user.email 2444265157@qq.com(邮箱)

(3)查看当前版本库的状态
当文件夹下有文件时，会显示红色
当文件提交到暂存区时，会显示绿色
当文件提交到版本库时，会显示干净
git status 

(4)添加到  暂存区
git add (file)  某个文件
git add . 所有文件

(5)提交到 版本库
git commit -m "第一次提交"
git commit --amend -m "第一次提交"		(已提交，但未push，可用这个命令修改上次提交信息)

(6)查看提交日志
git log

(7)提交到gitHub
(若是第一次)
git remote add potato(可自己命名) git@github.com:potatoloveyou/potaot.git(github仓库地址)		关联远程仓库
git branch -M main(分支名字)		重命名分支
git push -u potato(需要跟上面命名一样) main(分支名字)

(若不是第一次)
(报错时)
git pull --rebase potato(可自己命名) main(分支名字)
(不报错)
git puss (推送一切更新)


(8)撤销修改
git restore (file)  撤销工作区的修改
git restore --staged (file)  撤销暂存区的修改

(9)版本库倒退
git reset --hard HEAD  回到上一个版本
git reset --hard HEAD^ 回到上上一个版本
git reset --hard (版本号,可不复制全)  回到指定版本

(10)查看操作 命令历史
查看到历史后，可使用版本号回退
git reflog

(11)查看分支
git branch		查看本地分支
git branch -r		查看远程仓库分支

(12)创建分支
git checkout -b (potato)		创建potato分支(老)
git branch (potato)		创建potato分支

(13)切换分支
git checkout (main)		切换main分支(老)
git switch (main)		切换main分支

(14)合并分支
！！！需要在 需要合并 到的 主分支 上(例如已经在main分支上才执行下面这个)
git merge (potato)	在(master分支上)合并potato分支

(15)删除分支
git branch -d (potato)		
git branch -r -d (potato)		删除远程仓库分支




cmd命令:
dir   列出当前目录下所有目录与文件
cd    进入某个目录


linux命令:
ls    列出当前目录下所有目录与文件
pwd   显示当前目录路径
cd    进入某个目录


~~~

