# React-Native入门指南

## shopping-react-native
### 一、前言
 
	整个代码，仅供参考，对于一个有经验的开发人员，从看js Reactjs React-Native 到写demo总共2天时间就够了,由于没有做过前端，代码写的一般，见谅；后去会持续更新

### 二、环境配置
	(1)需要一台Mac(OSX),这个是前提，建议还是入手一本啦。
	(2)在Mac上安装Xcode,建议Xcode 6.3以上版本
	(3)安装node.js:https://nodejs.org/download/
	(4)建议安装watchman，终端命令：brew install watchman
	(5)安装flow：brew install flow
### 三、Hello, React-Native
创建一个React-Native的项目，因此可以按照下面的步骤：
打开终端

	(1)安装命令行工具：sudo npm install -g react-native-cli
	(2)创建一个空项目：react-native init HelloWorld
	(3)找到创建的HelloWorld项目,双击HelloWorld.xcodeproj即可在xcode中打开项目。xcodeproj是xcode的项目文件。
	(4)在xcode中，使用快捷键cmd + R即可启动项目。基本的Xcode功能可以熟悉，比如模拟器的选择等。
	(5)android 开发者请安装android开发环境，后打开模拟器 使用react-native run-android命令来运行程序
	
启动完成后，你会看到React-Packger和iOS模拟器（android模拟器）

### 四、shopping-react-native demo

使用的三方组件,我们启动npm命令行，在项目的根目录使用如下命令安装模块。
	
	$ npm install react-native-swiper --save
	$ npm i react-timer-mixin --save
	$ npm install react-native-store --save
	$ npm install react-native-simple-store
	$ npm install react-native-camera@latest --save//扫码
	
### 实战内容

	9宫格，轮播图，导航栏，tab栏，Webview,ListView,ScrollView等

### 效果图预览

 ![image](https://github.com/bigsui/shopping-react-native/blob/master/screenshot/rn1.png)
 
 ![image](https://github.com/bigsui/shopping-react-native/blob/master/screenshot/rn2.png)
 
 ![image](https://github.com/bigsui/shopping-react-native/blob/master/screenshot/rn3.png)
 
 ![image](https://github.com/bigsui/shopping-react-native/blob/master/screenshot/rn4.png)
 

 

