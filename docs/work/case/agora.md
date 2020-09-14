# Python小记
  没想到作为一个Javaer，第一次工作笔记献给了Python~
## 背景
&emsp;&emsp;之前有一个问题，供应商提供的方案需要申请一台服务器，则涉及每年一万多元的硬件费用以及一万多的开发费用。钱是不多，但是这样系统架构不太合理，工作中一个重要的原则是，尽量减少依赖、减少复杂度，如此涉及对于后续的维护和扩展都存有隐患。
## 思路
&emsp;&emsp;可以通过修改Nginx的配置文件来实现内网环境下的要求，但是对于VPN情况下，又需要改为另外一个配置。则就需要动态的进行Nginx设置变更。那么就可以通过一个URL请求来触发Nginx的设置变更。<br>
&emsp;&emsp;那么整体思路如下：
1. 复制两个Nginx文件，分别命名N1.conf N2.conf
2. 开发两个脚本Shell分别为S1、S2，分别是复制N1.conf/N2.conf 覆盖nginx.conf，然后执行nginx的reload操作；
3. 开发一个简单的后端，两个URL，分别执行S1，S2
4. VPN环境下，调用URL1，切换S1配置；内网调用URL2，再切换为S2；绝大部分情况都使用S2即可，这样的代价已经很小了。
## 选型
&emsp;&emsp;即然作为Javaer，第一时间想到Java来实现。但简单调研后，觉得Java有三个问题，并不适合：
1. 目前系统没有安装JDK/JRE需要安装并配置相关环境
2. Java执行Shell命令需要使用getRuntime得到Process再执行，效率很低
3. 占用内存太多，有点拿大炮打蚊子的感觉。

&emsp;&emsp;很快想到用GO或者Python来实现，看来一下`Python -Version`系统中果然已经安装了Python。那就决定用Python来实现了。<br>
&emsp;&emsp;百度一下用VS Code来写了一个简单的后台，代码也就一行，执行Shell脚本-S1 S2。
## 收获
* Python的Hello Wold，也算是实战过了~😂😂
* cp 命令不能强制覆盖，就算cp -f src tgt也不行，只能/cp 。因为一般cp都通过alias来重写了
* Python通过flask来开发web应用服务，以及相关的route写法
* Python语法
  ```python
    if __name__ == '__main__'://说明可以当作主程序允许
    app.run(host='0.0.0.0', port=1234)//可以被任意ip访问，指定端口
  ```
* 花了一个周末完全搞定，周一测试交业务测试；得到认可，使用方便而且节省了一小笔费用，灰常开心~😊

