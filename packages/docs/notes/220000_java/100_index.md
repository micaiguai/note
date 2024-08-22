# java

## 名词介绍
- Java SE(Java Standard Edition)
- Java EE(Java Enterprise Edition)
- JDK(Java Development Kit)
- JRE(Java Runtime Environment)
- JVM(Java Virtual Machine)

## 下载
[下载地址(openjdk)](https://www.openlogic.com/openjdk-downloads)

## 配置环境变量
> TODO: 单独开一个模块写这块内容

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

## Idea开发步骤
new Project -> new Module -> new Package -> new Class

## Idea Snippets
- main/psvm
```java
public static void main(String[] args) {

}
```
- sout
```java
System.out.println();
```

## 声明变量
```java
int age = 18;
```

## 基础类型
> TODO: 把图转换为代码
![基础类型](image.png)

| 数据类型 | 数据类型 | 字节数 | 数据范围   | 声明                  |
| -------- | -------- | ------ | ---------- | --------------------- |
| 整型     | byte     | 1      | -2^8~2^8-1 | `byte sex = 1;`       |
| 整型     | short    | 2      |            | `short foo = 1;`      |
| 整型     | int      | 4      |             | `int foo = 1;`        |
| 整型     | long     | 8      |            | `long foo = 1L;`      |
| 浮点型   | float    | 4      |            | `float foo = 1.1F;`   |
| 浮点型   | double   | 8      |            | `double foo = 1.1;`   |
| 字符型   | char     | 2      | 0~2^8      | `char foo = '1';`     |
| 布尔型   | boolean  | 1      |            | `boolean foo = true;` |

## 类型转换
### 自动类型转换
描述：范围小的类型可以赋值给范围类型大的类型

`byte` -> `short` -> `int` -> `long` -> `float` -> `double`

`char` -> `int` -> `long` -> `float` -> `double`

```java
byte foo = 1;
int bar = foo;
// output: 1
System.out.println(foo);
// output: 1
System.out.println(bar);
```

转换原理：`foo 00000001` ->`bar 00000000 00000000 00000000 00000001`

### 表达式的自动类型转换
描述：在表达式中，范围小的变量会转换为范围最大的变量类型参与运算。

`byte`、`short`、`char` -> `int` -> `long` -> `float` -> `double`

:::tip
`byte`、`short`、`char`是直接转换为`int`类型参与运算
:::

```java
int foo = 1;
long bar = 1L;
long baz = foo + bar;
// output: 2
System.out.println(baz);
```

### 强制类型转换
描述：强制把范围大的变量转换为范围小的变量

:::tip
- 可能出现数据丢失
- 浮点型转换为整型只保留整数
:::

```java
int foo = 1;
byte age = (byte) foo;
```
转换原理：`foo 00000000 00000000 00000000 00000001` ->`bar 00000001`

## 运算符
| 符号 | 作用           |
| ---- | -------------- |
| +    | 加             |
| -    | 减             |
| *    | 乘             |
| /    | 除，结果取整数 |
| %    | 取余数         |
| ++   | 自增           |
| --   | 自减           |

:::tip
`+`: 如果是两个数字相加，采用数学运算。如果含字符串，则是字符串拼接
:::

## 案例：获取用户的终端输入
```java
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Please input your name:");
        String name = scanner.nextLine();
        System.out.println("Please input your age:");
        int age = scanner.nextInt();
        System.out.println("Your name is " + name + ", age is " + age);
    }
}
```

## 案例：猜数字
```java
import java.util.Random;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Random random = new Random();
        int num = random.nextInt(100);
        Scanner scanner = new Scanner(System.in);
        while (true) {
            System.out.println("Please input num:");
            int input = scanner.nextInt();
            if (input > num) {
                System.out.println("bigger");
            } else if (input < num) {
                System.out.println("litter");
            } else if (input == num) {
                System.out.println("correct");
                break;
            }
        }

    }
}
```

## 数组
```java
// 声明
int[] nums = { 1, 2, 3 };
// 动态初始化
// 默认值，整型为：0；浮点型为：0.0；boolean型：false；
int[] nums2 = new int[3];
// 修改
nums[0] = 0;
// 访问
System.out.println(nums[0]);
// 访问长度
System.out.println(nums.length);
```

::: tip
在`Java`中，使用数组需要注意越界问题
:::

## 方法
```java
public class Main {
    public static void main(String[] args) {
        // output: 3
        System.out.println(sum(1, 2));
    }
    public static int sum(int a, int b) {
        return a + b;
    }
}
```

## 方法重载
描述：一个类中，方法名重复，参数不一样
```java
public class Main {
    public static void main(String[] args) {
        // output: 6
        System.out.println(sum(1, 2, 3));
    }
    public static int sum(int a, int b) {
        return a + b;
    }
    public static int sum(int a, int b, int c) {
        return a + b + c;
    }
}
```

## 面向对象
::: code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        Student student = new Student();
        student.name = "tom";
        // output: tom
        System.out.println(student.name);
    }
}
```
```java [Student.java]
public class Student {
    String name;
}
```
:::

## This
描述：`this`指向当前对象
::: code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        Student student = new Student();
        student.printThis();
    }
}
```
```java [Student.java]
public class Student {
    public void printThis() {
        // output: com.mcg.Student@7d4991ad
        System.out.println(this);
    }
}
```
:::

## 构造器
::: code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        Student tom = new Student("tom");
        Student jerry = new Student("jerry", 2);
        // output: tom
        System.out.println(tom.name);
        // output: 2
        System.out.println(jerry.age);
    }
}
```
```java [Student.java]
public class Student {
    String name;
    int age;

    public Student(String name) {
        this.name = name;
    }
    public Student(String name, int age) {
        this.name = name;
        this.age = age;
    }
}
```
:::
::: tip
如果没有声明构造器，`Java`会自动生成一个无参构造器
:::

## 实体类
描述：成员变量必须私有，暴露相应的`get`和`set`方法，需要有个无参构造器
```java
public class Student {
    private String name;

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
}
```

## 包
描述：类似文件夹，用来管理不同程序的
```java
package com.mcg.javabean;

public class Student {
}
```

::: tip
- 同一个包下，无需导入
- 不同包，需要导入。需要手动引入`import 包名.类名`
- `Java.lang`无需导入
:::

## String
```java
public class Main {
    public static void main(String[] args) {
        String str = "foo";
        str += "bar";
        // output: foobar
        System.out.println(str);

        String foo = "foo";
        String foo2 = "foo";
        // output: true
        System.out.println(foo == foo2);

        String bar = new String("bar");
        String bar2 = new String("bar");
        // output: false
        System.out.println(bar == bar2);
    }
}
```

:::tip
- `String`对象时不可变的，每次赋值是生成一个新的对象并改变变量指向
- 以`"`声明的字符串会存在常量池中
- 以`new String`声明的字符串会放在堆内存中
:::

## ArrayList
