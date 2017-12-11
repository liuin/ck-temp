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
#T=希望用代码库中的文件完全覆盖本地工作版本
反过来,如果希望用代码库中的文件完全覆盖本地工作版本. 方法如下:
git reset --hard
git pull
#