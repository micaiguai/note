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
描述：集合

::: tip
数组长度固定，集合的长度是动态的
:::

## static
描述：静态，修饰变量和方法。可通过类访问。

## 代码块
描述：静态代码块会在类加载时执行，实例代码块会在创建实例时在构造器前进行。

::: code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        System.out.println(Student.description);
        new Student();
    }
}
```
```java [Student.java]
public class Student {
    public static String description = "student";
    static {
        System.out.println("static");
    }
    {
        System.out.println("instance");
    }
}
```
```sh [Terminal]
static
student
instance
```
:::

## 单例模式
描述：确保一个类只有一个对象

步骤：
1. 私有构造器
2. 定义静态属性为类实例
3. 定义静态方法返回该实例

::: code-group
```java [饿汉式]
// 饿汉式单例：在获取实例前，提前创建好实例
public class A {
    private static final A a = new A();
    private A() {};
    public static A getObject() {
        return a;
    }
}
```
```java [懒汉式]
// 懒汉式单例：在获取实例时，才创建实例
public class A {
    private static A a;
    private A() {};
    public static A getObject() {
        if (a == null) {
            a = new A();
        }
        return a;
    }
}
```
:::

## 继承
描述：用`extends`关键字实现继承

特点
- 子类能继承父类的非私有的成员
- 实例的创建是由子类和父类共同完成的
- 不支持多继承
- 所有类都继承`Object`类

::: code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        Child child = new Child();
        // error: 'name' has private access in 'com.mcg.javabean.Parent'
        // System.out.println(child.name);
        // output: true
        System.out.println(child.childFlag);
        // output: true
        System.out.println(child.humanFlag);
    }
}
```
```java [Parent.java]
public class Parent {
    public boolean humanFlag = true;
    private String name = "tom";
}
```
```java [Child.java]
public class Child extends Parent {
    public boolean childFlag = true;
}
```
:::

## 权限修饰符
描述：限制类成员的访问范围

| 修饰符  | 本类 | 同一个包 | 子包 | 任意包 |
| ------- | ---- | -------- | ---- | ------ |
| private | ✔️    | ❌        | ❌    | ❌      |
| default | ✔️    | ✔️        | ❌    | ❌      |
| protect | ✔️    | ✔️        | ✔️    | ❌      |
| public  | ✔️    | ✔️        | ✔️    | ✔️      |

## 方法重写
描述：子类继承父类时，重写父类的方法

:::tip
- 使用`@Override`注解（推荐）
- 子类的方法访问权限必须大于父类的
- 子类的返回值需要收敛
:::

::: code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        Child child = new Child();
        // output: hello
        child.say();
    }
}
```
```java [Parent.java]
public class Parent {
    public void say() {
        System.out.println("hi");
    }
}
```
```java [Child.java]
public class Child extends Parent {
    @Override
    public void say() {
        System.out.println("hello");
    }
}
```
:::

## 访问成员
描述：采用就近原则。通过`this`访问实例成员。通过`super`访问父类成员。

::: code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        Child child = new Child();
        child.say();
    }
}
```
```java [Parent.java]
public class Parent {
    public String name = "tom";
}
```
```java [Child.java]
public class Child extends Parent {
    public String name = "jerry";
    public void say() {
        String name = "bob";
        // output: bob
        System.out.println(name);
        // output: jerry
        System.out.println(this.name);
        // output: tom
        System.out.println(super.name);
    }
}
```
:::

## 子类构造器
描述：父类构造器会在子类构造器之前执行完

:::tip
- 子类构造器的第一行如果没写`super()`，`Java`会默认添加`super()`
- 通过`this()`调用兄弟构造器
- `super()`和`this()`只能出现在第一行
:::

::: code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        Child child = new Child();
    }
}
```
```java [Parent.java]
public class Parent {
    public boolean isHuman;
    public Parent() {
        System.out.println("parent init");
        this.isHuman = true;
    }
}
```
```java [Child.java]
public class Child extends Parent {
    public String name;
    public Child() {
        this("jerry");
    }
    public Child(String name) {
        super();
        System.out.println("child init");
        this.name = name;
    }
}
```
```sh [Terminal]
parent init
child init
```
:::

## 多态
描述：多态是继承后的一种的现象，需要存在方法重写

语法
```java
父类 instance = new 子类()
```

:::tip
- 多态是是指对象、行为的多态
- 多态下不能使用子类的独有功能，可以通过强制类型转换解决
:::

::: code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        Animal cat = new Cat();
        // output: meow
        cat.speak();
        // error: Cannot resolve method 'scratch' in 'Animal'
        // cat.scratch();
        // 强转前最好类型校验一下
        if (cat instanceof Cat) {
            Cat theCat = (Cat)cat;
            theCat.scratch();
        }
        Animal dog = new Dog();
        // output: wow
        dog.speak();
    }
}
```
```java [Animal.java]
public class Animal {
    public void speak() {
        System.out.println("o");
    }
}
```
```java [Cat.java]
public class Cat extends Animal {
    @Override
    public void speak() {
        System.out.println("meow");
    }
    public void scratch() {}
}
```
```java [Dog.java]
public class Dog extends Animal {
    @Override
    public void speak() {
        System.out.println("wow");
    }
}
```
:::

## final
描述：修饰符

特性：
- 修饰类时，该类无法继承
- 修饰方法，该方法无法重写
- 修饰变量，该变量只能赋值一次

## abstract
描述：修饰符

特性：
- 抽象类可以有抽象方法，抽象方法所在的类一定是抽象类
- 修饰方法时，只能有抽象签名，不能有方法体，交给子类实现
- 抽象类不能创建对象

## interface
描述：接口

特性：
- 接口不能创建对象，需要通过类`implements`，此类称为实现类
- 接口方法只能有抽象签名，不能有方法体
- 类可以实现多个接口

新特性：
- `default`修饰方法时，需要写方法体，默认加上`public`修饰
- `private`修饰方法时，需要写方法体，为私有方法，`JDK9`支持
- `static`修饰方法时，需要写方法体，为静态方法，默认加上`public`修饰

方法签名冲突问题：
- 类实现多个接口，不支持实现。可通过类重写解决。
- 类继承父类实现接口，父类优先

## 内部类

### 成员内部类
::: code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        Animal.Cat cat = new Animal().new Cat();
    }
}
```
```java [Animal.java]
public class Animal {
    private String symbol = "animal";
    public class Cat {
        private String symbol = "cat";
        // JDK16 才支持
        // private static String description  = "cute";
        public void print() {
            System.out.println(this.symbol);
            System.out.println(Animal.this.symbol);
        }
    }
}
```
:::

### 静态内部类
::: code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        Animal.Cat cat = new Animal().new Cat();
    }
}
```
```java [Animal.java]
public class Animal {
    private String symbol = "animal";
    public static class Cat {
        private String symbol = "cat";
        public void print() {
            System.out.println(this.symbol);
            // error: 'com.mcg.javabean.Animal.this' cannot be referenced from a static context
            // System.out.println(Animal.this.symbol);
        }
    }
}
```
:::

### 局部内部类
描述：定义在方法、代码块、构造器等里面的类

### 匿名内部类
描述：不需要命名的局部内部类

::: code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        Animal cat = new Animal() {
            @Override
            public void speak() {
                System.out.println("meow");
            }
        };
        // output: meow
        cat.speak();
    }
}
```
```java [Animal.java]
public class Animal {
    public void speak() {
        System.out.println("o");
    }
}
```
:::

## 枚举

::: code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        // output: Male
        System.out.println(Sex.Male);
    }
}

```
```java [Sex.java]
public enum Sex {
    Male,
    Female
}
```
```java [Sex.class]
Compiled from "Sex.java"
public final class com.mcg.Sex extends java.lang.Enum<com.mcg.Sex> {
  public static final com.mcg.Sex Male;
  public static final com.mcg.Sex Female;
  public static com.mcg.Sex[] values();
  public static com.mcg.Sex valueOf(java.lang.String);
  static {};
}
```
:::

## 泛型
描述：定义类、接口、方法时，声明的类型变量

:::tip
不支持基础类型，只支持对象类型
:::

### 泛型类
::: code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        Store<Integer> store = new Store<>(1);
        Integer value = store.getValue();
    }
}
```
```java [Store.java]
public class Store <E> {
    private E value;
    public Store(E value) {
        this.value = value;
    }
    public E getValue() {
        return value;
    }
}
```
:::

### 泛型方法
```java
public class Main {
    public static void main(String[] args) {
        Integer value = getValue(1);
    }
    public static <T> T getValue(T value) {
        return value;
    }
}
```

### 通配符
特点：
- `?`是通配符，代表一切类型符合条件
- `? extends Animal`，当前类和子类符合条件
- `? super Animal`，当前类和父类符合条件

```java
public class Main {
    public static void main(String[] args) {
        List list = getList(new ArrayList<Cat>());
    }
    public static List getList(ArrayList<? extends Animal> list) {
        return list;
    }
}
```

## 自动装箱和自动拆箱
```java
public class Main {
    public static void main(String[] args) {
        // 自动装箱
        Integer i = 1;
        // 自动拆箱
        int i2 = i;
    }
}
```

## Lambda
描述：简化匿名内部类的方法，被`@FunctionalInterface`修饰的接口、类才可以被简化

```java
public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> numList = new ArrayList<>();
        numList.add(1);
        numList.add(3);
        numList.add(2);
        // numList.sort(new Comparator<Integer>() {
        //     @Override
        //     public int compare(Integer o1, Integer o2) {
        //         return Integer.compare(o1, o2);
        //     }
        // });
        numList.sort((o1, o2) -> Integer.compare(o1, o2));
        // output:[1，2, 3]
        System.out.println(numList);
    }
}
```

## 方法引用
描述：进一步简化`Lambda`表达式

### 静态类型方法引用
```java
public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> numList = new ArrayList<>();
        numList.add(1);
        numList.add(3);
        numList.add(2);
        // numList.sort((o1, o2) -> Integer.compare(o1, o2));
        numList.sort(Integer::compare);
        System.out.println(numList);
    }
}
```

### 特定类型方法引用
```java
public class Main {
    public static void main(String[] args) {
        ArrayList<Integer> numList = new ArrayList<>();
        numList.add(1);
        numList.add(3);
        numList.add(2);
        // numList.sort((o1, o2) -> o1.compareTo(o2));
        numList.sort(Integer::compareTo);
        System.out.println(numList);
    }
}
```

### 构造器引用
:::code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        // MyArrayListCreator<Integer> myArrayListCreator = new MyArrayListCreator<Integer>() {
        //     @Override
        //     public ArrayList<Integer> create() {
        //         return new ArrayList<>();
        //     }
        // };
        // MyArrayListCreator<Integer> myArrayListCreator = () -> new ArrayList<>();
        MyArrayListCreator<Integer> myArrayListCreator = ArrayList::new;
    }
}
```
```java [MyArrayListCreator.java]
public interface MyArrayListCreator<T> {
    ArrayList<T> create();
}
```
:::

## 异常
描述：异常在`Java.lang.Throwable`包下。分为`Error`和`Exception`，`Error`是系统级别的错误，开发者不用管。`Exception`分为运行时异常`RuntimeException`和编译时异常。

### 运行时异常
:::code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) {
        // Exception in thread "main" com.mcg.IllegalNumRuntimeError: num 11 is illegal
        //     at com.mcg.Main.handleNum(Main.java:15)
        //     at com.mcg.Main.main(Main.java:10)
        handleNum(11);
    }
    public static void handleNum(int num) {
        if (num > 10) {
            throw new IllegalNumRuntimeError("num " + num + " is illegal");
        }
    }
}
```
```java [IllegalNumRuntimeError.java]
class IllegalNumRuntimeError extends RuntimeException {
    public IllegalNumRuntimeError(String message) {
        super(message);
    }
}
```
:::

### 编译时异常
:::code-group
```java [Main.java]
public class Main {
    public static void main(String[] args) throws IllegalNumRuntimeError {
        try {
            handleNum(111);
        } catch (IllegalNumRuntimeError e) {
            throw e;
        }
    }
    public static void handleNum(int num) throws IllegalNumRuntimeError {
        if (num > 10) {
            throw new IllegalNumRuntimeError("num " + num + " is illegal");
        }
    }
}
```
```java [IllegalNumRuntimeError.java]
class IllegalNumRuntimeError extends Exception {
    public IllegalNumRuntimeError(String message) {
        super(message);
    }
}
```
:::
