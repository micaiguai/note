# java

## 名词介绍
- java se(java standard edition)
- java ee(java enterprise edition)
- jdk(java development kit)

## 下载
[下载地址(openjdk)](https://www.openlogic.com/openjdk-downloads)

## 安装
> TODO

## 终端测试是否安装成功
输入以下命令，如果有输出，则表示安装完成
```sh
# 执行
java
# 编译
javac
```

## hello world
开发`java`程序，需要三个步骤：编写、编译、运行

具体步骤：
1. 编写`HelloWorld.java`
```java
// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("hello world");
    }
}
```
2. 通过`javac`编译`HelloWorld.java`生成`HelloWorld.class`
```sh
javac HelloWorld.java
```
3. 通过`java`执行`HelloWorld.class`
```sh
java HelloWorld
# output
hello world
```
