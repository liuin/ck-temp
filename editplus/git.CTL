#TITLE=git
#INFO
New Cliptext library
#SORT=n

#T=git-pull
git pull origin master
#T=git忽略而不提交文件的3种情形
1、从未提交过的文件可以用.gitignore
也就是添加之后从来没有提交（commit）过的文件，可以使用.gitignore忽略该文件
该文件只能作用于未跟踪的文件（Untracked Files），也就是那些从来没有被 git 记录过的文件

比如，忽略log/下的日志文件，可以在.gitignore中写
[plain] view plain copy
log/*  

2、已经推送（push）过的文件，想从git远程库中删除，并在以后的提交中忽略，但是却还想在本地保留这个文件
执行命令
[plain] view plain copy
git rm --cached Xml/config.xml  
后面的 Xml/config.xml 是要从远程库中删除的文件的路径，支持通配符*

比如，不小心提交到git上的一些log日志文件，想从远程库删除，可以用这个命令


3、已经推送（push）过的文件，想在以后的提交时忽略此文件，即使本地已经修改过，而且不删除git远程库中相应文件
执行命令
[plain] view plain copy
git update-index --assume-unchanged Xml/config.xml  
后面的 Xml/config.xml 是要忽略的文件的路径。如果要忽略一个目录，打开 git bash，cd到 目标目录下，执行：
[plain] view plain copy
git update-index --assume-unchanged $(git ls-files | tr '\n' ' ')  


git update-index --no-assume-unchanged /path/file  来恢复跟踪
#T=如何用命令将本地项目上传到git
如何用命令将本地项目上传到git
1、（先进入项目文件夹）通过命令 git init 把这个目录变成git可以管理的仓库

git init
2、把文件添加到版本库中，使用命令 git add .添加到暂存区里面去，不要忘记后面的小数点“.”，意为添加文件夹下的所有文件

git add .
3、用命令 git commit告诉Git，把文件提交到仓库。引号内为提交说明

git commit -m 'first commit'
4、关联到远程库

git remote add origin 你的远程库地址
如：

git remote add origin https://github.com/cade8800/ionic-demo.git
5、获取远程库与本地同步合并（如果远程库不为空必须做这一步，否则后面的提交会失败）

git pull --rebase origin master
6、把本地库的内容推送到远程，使用 git push命令，实际上是把当前分支master推送到远程。执行此命令后会要求输入用户名、密码，验证通过后即开始上传。

git push -u origin master
*、状态查询命令

git status
#T=使用强制push的方法：
1.使用强制push的方法：

$ git push -u origin master -f 

这样会使远程修改丢失，一般是不可取的，尤其是多人协作开发的时候。

2.push前先将远程repository修改pull下来

$ git pull origin master

$ git push -u origin master

3.若不想merge远程和本地修改，可以先创建新的分支：

$ git branch [name]

然后push

$ git push -u origin [name]
#T=希望用代码库中的文件完全覆盖本地工作版本
反过来,如果希望用代码库中的文件完全覆盖本地工作版本. 方法如下:
git reset --hard
git pull
#