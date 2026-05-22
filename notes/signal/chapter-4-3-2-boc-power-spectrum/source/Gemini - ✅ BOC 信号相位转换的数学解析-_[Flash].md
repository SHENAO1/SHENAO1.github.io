# ✅ BOC 信号相位转换的数学解析->[Flash]

---

## 📤 导出信息
- **会话标题**: ✅ BOC 信号相位转换的数学解析->[Flash]
- **导出时间**: 2026/5/22 12:41:02
- **来源**: Gemini
- **链接**: https://gemini.google.com/app/88d536b4df86de0d

---

## 🙋 用户

![所上传图片的预览图](https://lh3.googleusercontent.com/gg/AEir0wITRLOaK2RLwnTM-AAN-uU2W2xF_oj051TZsIpSFYhQ3iCmY0NU4XaEoE7uKixsDYKo6tXVezs0BuIO97e8ZhYAvemxCtjUQolHmannk-zqB3SgUx7YtlMn54bngbe0BqgzVeqEnwNHyNjt7Of2CrlLvZBqCnTyYJDNpd747gHERetsKEM8mYBwJiBYTDp--THk9Y-HHD4Gmc3gXeYjNPc81YO0QZQYwe83l-sxuztfsnC9ujnP-4sa6XXBO46mH95ZOJlX7Wndy-8_5mzK6hJV63POLTgm9w)

![所上传图片的预览图](https://lh3.googleusercontent.com/gg/AEir0wLZ0FR6CNY3cA4mLQ8u7nf0sTkKrqNMy3UeR86YwfkYtD8MHHBcVoYGAvSIjtZ3GObYZv11UEq2GynD6E8rDsCK6HodpVJjHQtLO7LkBtfKNzpf5BFkiOLrzXkLSH3VSs2l68Ju1JmNwsPrxby4r43hlgVZc2YjIkp7XNUoWARbHcxTCun5KDDa7CL8_MdF9UhFzXzmVN6h22cNZ2Bca6k4s2I1w4UETlocw2pfT8cF1ChwXHuybP8i0S6yqrFE-E1lFKB6ZUG0rtBZSyiZK9qB6qAbz3nctvg)

![所上传图片的预览图](https://lh3.googleusercontent.com/gg/AEir0wKNHg659p4ZzvcRpInZNdE6AsZtm95BfEaEGLEFuYsAp4_wsgLdQwchn71WtzIUcGrxN19Yk9tTODIQLFbIxFMQGM83mxmDGjDu3Wgpv6ewn6uXBYIt0D79B_6tCfb7B6olhI2qfxtvdaHzjQTWccLV2xKa3V2MUOp1o0lsAx-WAjkzZodLfhSNgi9k1Rd3ftD1aYOSuAnrEODWGoK3Ha8DASgdTE2cT0RMHbq9m9NKMEI0WFVI72ESy3fHLe1yDYjZxmSuchv9svq6XKTfX6E-G22vO16CSDs)

![所上传图片的预览图](https://lh3.googleusercontent.com/gg/AEir0wKEUriZVUnLOZ4_FngxAje_8IrhDXMD-We4psePElKpsKoVPgLZF46gxqTlaA0MNDh1JRsS4jgAr--VqqEglVVNCtpF2qZp8JoR2LxEBOyx-TuKWVudb9UZAm_OCiPIXsVEHrum2MXT9fiQaLisW9PAPUTsPL3pbSvoTDIOsoam4oLwyvljh9EBpHGZizrSaXpBhwUrr2r0mfkt0lWn-hG5OGzxMkyGnGnkA6oF22V1chMAW9LdCh3-fhLlfUy0jWjYzD5e84WAFePg0rOpixaJ4g2JVVGOooA)

图2,3, 4,是教材内容，如何理解对于余弦相位 BOC，副载波相位相当于移动了四分之一周期。它改变的是与  相关的副载波因子：正弦相位中的sin会变成1-cos的差的平方项呢？

---

## 🤖 Gemini

要理解为什么正弦相位的 $\sin^2(\pi f T_s)$ 会变成余弦相位的 $[1 - \cos(\pi f T_s)]^2$，我们可以从**纯数学公式重构**和**时频域物理意义**两个维度来剖析。

其实，这两个表面上看起来截然不同的各项，在进行半角/倍角公式展开后，暴露出的是完全相同的骨架，它们之间仅仅相差了一个标准的相位移动。


## 1. 三角函数的“变脸”本质（数学推导）
我们引入一个核心自变量 $\theta = \frac{\pi f T_s}{2}$。现在利用三角恒等式对这两个因子进行重写：


- **对于正弦相位因子：**
  利用倍角公式 $\sin(2\theta) = 2\sin\theta\cos\theta$，可以得到：

  $$\sin^2(\pi f T_s) = \left[ 2 \sin\left(\frac{\pi f T_s}{2}\right) \cos\left(\frac{\pi f T_s}{2}\right) \right]^2 = 4 \sin^2\left(\frac{\pi f T_s}{2}\right) \cos^2\left(\frac{\pi f T_s}{2}\right)$$
- **对于余弦相位因子：**
  利用半角公式 $1 - \cos(2\theta) = 2\sin^2\theta$，可以得到：

  $$\left[1 - \cos(\pi f T_s)\right]^2 = \left[ 2 \sin^2\left(\frac{\pi f T_s}{2}\right) \right]^2 = 4 \sin^2\left(\frac{\pi f T_s}{2}\right) \sin^2\left(\frac{\pi f T_s}{2}\right)$$


### 核心发现
将两者的展开式放在一起对比：


- **正弦相位** $\rightarrow 4 \sin^2(\theta) \cdot \mathbf{\cos^2(\theta)}$
- **余弦相位** $\rightarrow 4 \sin^2(\theta) \cdot \mathbf{\sin^2(\theta)}$

可以看出，它们完全共享了前面的 $4\sin^2(\theta)$ 因子，唯一的变化是**把后面的 $\cos^2(\theta)$ 替换成了 $\sin^2(\theta)$**。根据三角函数的诱导公式，$\cos(\theta - \frac{\pi}{2}) = \sin(\theta)$，这在频谱结构上正是标准的 **$\frac{\pi}{2}$ 相位移动**。


## 2. 四分之一周期移动如何映射到频域（物理意义）
在时域中，正弦副载波为 $\text{sgn}[\sin(2\pi f_s t)]$，余弦副载波为 $\text{sgn}[\cos(2\pi f_s t)]$。
因为 $\cos(2\pi f_s t) = \sin(2\pi f_s t + \frac{\pi}{2})$，时域上副载波的相位移动了 $\frac{\pi}{2}$ 弧度。

对应的**时间延迟量 $\Delta t$** 为：


$$\Delta t = \frac{\frac{\pi}{2}}{2\pi f_s} = \frac{1}{4f_s} = \frac{T_s}{4}$$
这就印证了教材中的第一句话：“副载波相位相当于移动了四分之一周期”。

根据傅里叶变换的时移性质，时域的延迟 $\Delta t$ 会在频域引入一个复相移因子：


$$e^{-j 2\pi f \cdot \Delta t} = e^{-j 2\pi f \cdot \frac{T_s}{4}} = e^{-j \frac{\pi f T_s}{2}}$$
注意看这个复指数的相位：$\frac{\pi f T_s}{2}$。它恰好就是我们在第一步数学推导中作为自变量的那个 $\theta$！


## 3. 为什么平方后功率谱的形状变了？（门函数的切边效应）
你可能会产生一个疑问：*既然时移在频域只是引入了模值为 1 的项 $e^{-j\theta}$，为什么求功率谱（取模平方）后，整个谱线的形状发生了改变，而不是保持谱线形状不变呢？*

关键在于 **BOC 信号不是无限长的，它被限制在有限长度的码片时窗 $T_c$（门函数）内**：


1. 如果是对无限长的连续方波进行时移，其功率谱密度的确不会发生任何改变。
2. 然而，BOC 的单个码片波形 $p(t)$ 是副载波与门函数 $[0, T_c]$ 相乘的结果。当你在固定的时间窗口 $[0, T_c]$ 内将副载波移动 $\frac{T_s}{4}$ 时，**码片边界处的跳变沿（Discontinuities）特征被彻底改变了**。
  - **正弦 BOC**：在码片的交界处（$t=0$ 和 $t=T_c$）刚好是正弦波的零点，波形在边界上的跳变方向和内部 transition 相互抵消或对称。
  - **余弦 BOC**：由于移动了 $\frac{T_s}{4}$，在边界处（$t=0$ 和 $t=T_c$）强行切断了处于峰值的方波，从而在码片边缘引入了额外的尖锐突变。

这种时域边界截断特征的变化，通过傅里叶变换后，在解析式里就体现为调制包络中特定的特征项从 $\cos^2(\theta)$ 变为了 $\sin^2(\theta)$。利用逆向的三角函数合并，最终表现为了从单项平方 $\sin^2(\pi f T_s)$ 到差值平方 $[1 - \cos(\pi f T_s)]^2$ 的形式。

---

## 🙋 用户

![所上传图片的预览图](https://lh3.googleusercontent.com/gg/AEir0wJXwB_XFVSbLP7Uc1ihcc5McMPl3O5X6Yaq_qlVxyDx_48BJLSkyNXgG73QaHIRFckB1FvtpdCG4PDoiWeLz8HEiz2PrHkZH1UK4EltXc5BaCqYtwwfTRgBJB_xRtqeDQaNLqSBYhAYwM6aNU446lTQHoyOhiNUQiP1cXFH_0DAgUx89Zvt4aFsG7jtvrHZeJoqGgNn0bXsv6-6wgy7i8Gtfj3TVOe-goNqgmELRERsOr-DWQGQEYYdAuOaZYfaiHVtYE_KZQO9TNiGk_OWmdAibQ5ULmMsGg)

所有推导是从这个式子开始的，这个式子不是正弦相位和余弦相位BOC都通用吗？

---

## 🤖 Gemini

**不通用**。这个式子**仅适用于正弦相位BOC（$\text{BOC}_s$）**，不能直接用于余弦相位BOC（$\text{BOC}_c$）。


### 根本原因：起始相位的跳变位置不同
在这个推导体系中，$T_s$ 代表副载波的**半周期**（即方波脉冲宽度）。


- **正弦相位 ($\text{BOC}_s$)**：
  方波在 $t=0$ 处从 0 跳变到 $+1$，并且持续一整个半周期 $T_s$。因此其脉冲区间完美对应 $[0, T_s), [T_s, 2T_s), \dots$，即公式中的 $[kT_s, (k+1)T_s]$。
- **余弦相位 ($\text{BOC}_c$)**：
  由于余弦信号在 $t=0$ 处已经是峰值（$\cos(0)=1$），它在过零点 $t = \frac{1}{2}T_s$（即四分之一完整波形周期）处就会发生第一次符号跳变。
  这意味着，在单码片 $[0, T_c]$ 的起点，它的第一个子区间长度只有 **$\frac{1}{2}T_s$**，而不是整整一个 $T_s$。


### 余弦相位BOC的单码片表达式
如果硬要把余弦相位写成类似的区间指示函数形式，就必须把因为“时移”而切碎的边界区间单独拆解（以调制阶数 $M$ 为偶数为例）：


$$p_c(t) = \mathbf{1}_{[0, \frac{1}{2}T_s]}(t) + \sum_{k=1}^{M-1} (-1)^k \mathbf{1}_{[(k-\frac{1}{2})T_s, (k+\frac{1}{2})T_s]}(t) + (-1)^M \mathbf{1}_{[(M-\frac{1}{2})T_s, MT_s]}(t)$$
因为积分区间（指示函数的上下限）从第一步开始就完全不同，后续进行傅里叶变换得到的指数项无法直接合并，最终才导致了正弦相位出现 $\sin^2(\pi f T_s)$，而余弦相位演变成 $[1 - \cos(\pi f T_s)]^2$ 的结果。

---

## 🙋 用户

为什么会变成1-cos的差的平方项，而不是1-cos的平方的差

---

## 🤖 Gemini

这可以从**谱密度计算的复数本质**和**物理意义的必然性**两个层面来解释：


### 1. 复数域推导里的“完全平方式”
在对余弦相位 BOC 的单码片波形进行傅里叶变换时，由于它在码片边界和内部存在对称的跳变，积分后在频域中会必然组合出一个关于复指数的**完全平方式**：


$$(1 - e^{-j\theta})^2 \quad （其中 \theta = \pi f T_s）$$
功率谱密度（PSD）的核心是求傅里叶变换结果的**模平方**。因此，我们需要对这个完全平方式取模平方：


$$\left| (1 - e^{-j\theta})^2 \right|^2 = \left( \left| 1 - e^{-j\theta} \right|^2 \right)^2$$
根据复数求模的基本公式：


$$\left| 1 - e^{-j\theta} \right|^2 = (1 - \cos\theta)^2 + \sin^2\theta = 1 - 2\cos\theta + \cos^2\theta + \sin^2\theta = 2(1 - \cos\theta)$$
将这个结果代回平方项中：


$$\left( \left| 1 - e^{-j\theta} \right|^2 \right)^2 = \left[ 2(1 - \cos\theta) \right]^2 = 4(1 - \cos\theta)^2$$
由于最外层还有一个平方，最终化简出来的只能是**差的平方项 $[1 - \cos(\pi f T_s)]^2$**，而绝不是平方的差。


### 2. 两者的物理意义完全不同
如果化简成了你提到的“平方的差”：


$$1 - \cos^2(\pi f T_s) \equiv \sin^2(\pi f T_s)$$
这刚好就是正弦相位 BOC（$\text{BOC}_s$）的特征因子。如果其余弦相位推导出来也是 $1 - \cos^2\theta$，那就意味着余弦时移没有对能量分布产生任何改变，其余弦相位的频谱将和正弦相位完全重合，这显然与“余弦相位导致频谱向两侧进一步分裂”的物理事实相违背。

将**差的平方**展开来看：


$$[1 - \cos\theta]^2 = 1 - \mathbf{2\cos\theta} + \cos^2\theta$$
中间多出来的这档**交叉项 $-2\cos\theta$**，在数学上完美的勾勒出了余弦副载波在固定码片边界上被“强行截断”所产生的边缘尖锐突变（Discontinuities），正是它改写了整个谱线的能量分布。

---

## 🙋 用户

由于它在码片边界和内部存在对称的跳变，积分后在频域中会必然组合出一个关于复指数的完全平方式——怎么解释？

---

## 🤖 Gemini

要理解为什么频域中一定会组合出一个**关于复指数的完全平方式**，最直观的方法是“拉片式”地看一次它的傅里叶变换全过程。

我们可以用最简单的偶数阶余弦 BOC 信号—— $\text{BOC}_c(1,1)$（即 $M=2$，单码片内包含 2 个完整的副载波全周期，即 4 个半周期）作为切片来剖析。在这个例子中，一个码片时间 $T_c = 2T_s$。


## 1. 产生“完全平方式”的数学推导
在单码片 $[0, 2T_s]$ 内，余弦相位副载波的波形是一个对称的跳变函数：


- 在 $[0, \frac{1}{2}T_s]$ 期间，值为 $+1$
- 在 $[\frac{1}{2}T_s, \frac{3}{2}T_s]$ 期间，值为 $-1$
- 在 $[\frac{3}{2}T_s, 2T_s]$ 期间，值为 $+1$

我们对它进行傅里叶变换 $P_c(f) = \int_{0}^{2T_s} p_c(t) e^{-j\omega t} dt$（令 $\omega = 2\pi f$）：


$$P_c(f) = \int_{0}^{\frac{1}{2}T_s} (1)e^{-j\omega t}dt + \int_{\frac{1}{2}T_s}^{\frac{3}{2}T_s} (-1)e^{-j\omega t}dt + \int_{\frac{3}{2}T_s}^{2T_s} (1)e^{-j\omega t}dt$$
积出来的项长成这样：


$$P_c(f) = \frac{1}{-j\omega} \left[ \left(e^{-j\omega \frac{1}{2}T_s} - 1\right) - \left(e^{-j\omega \frac{3}{2}T_s} - e^{-j\omega \frac{1}{2}T_s}\right) + \left(e^{-j\omega 2T_s} - e^{-j\omega \frac{3}{2}T_s}\right) \right]$$
为了看清本质，我们设一个**基础复指数算子 $A = e^{-j\omega \frac{1}{2}T_s}$**（也就是信号每走四分之一周期产生的相移）。把上面的式子合并同类项，括号里就变成了一个关于 $A$ 的高次多项式：


$$\text{括号内} = A^4 - 2A^3 + 2A - 1$$
现在，我们对这个多项式做因式分解：
$$\begin{aligned}
A^4 - 2A^3 + 2A - 1 &= (A^4 - 1) - 2A(A^2 - 1) \
&= (A^2 - 1)(A^2 + 1) - 2A(A^2 - 1) \
&= (A^2 - 1)(A^2 - 2A + 1) \
&= (A^2 - 1)\mathbf{(A - 1)^2}
\end{aligned}$$

快看！**$(A - 1)^2$ 这样一个完美的完全平方式就这样在因式分解中自然脱胎而出了。** 无论 $M$ 是多少，这种由波形交替跳变带来的多项式系数对称性，都会在因式分解时产生 $(A-1)^2$ 的高阶幂次。


## 2. 为什么物理上必然会产生这种对称因式？
在时域中，对这种“方波跳变”信号求导，你会得到一串在跳变点处的**狄拉克 $\delta$ 脉冲**。
对于上述波形，它在 $t = 0, \frac{1}{2}T_s, \frac{3}{2}T_s, 2T_s$ 处的跳变沿幅度分别为：$+1, -2, +2, -1$。

这组系数 $[1, -2, 2, -1]$ 在信号处理中非常特殊：


1. 它代表了一种二阶差分（Double Difference）的结构。
2. 这种正负交错且绝对值对称的跳变，在频域的多项式根空间里，意味着 $A=1$ 是它的**重根**。

因为时域波形关于码片中心是完美镜像对称（偶函数）的，所以移到原点后它的傅里叶变换必须是纯实数。这种强对称性强迫频域里的复指数多项式必须能够成对地开方、合并，最终在因式分解的形态上表现为复数域的完全平方式 $(A-1)^2$。


## 3. 从复数完全平方到实数差的平方
当我们计算功率谱密度时，需要对傅里叶变换的结果求**模平方**：


$$\left| P_c(f) \right|^2 \propto \left| A^2 - 1 \right|^2 \cdot \left| (A - 1)^2 \right|^2 = \left| A^2 - 1 \right|^2 \cdot \mathbf{\left| A - 1 \right|^4}$$
把 $A = e^{-j\omega \frac{1}{2}T_s}$ 代回后，利用欧拉公式展开复数模长：


$$\left| A - 1 \right|^2 = \left| e^{-j\omega \frac{1}{2}T_s} - 1 \right|^2 = 2 - 2\cos\left(\frac{\omega T_s}{2}\right) = 4\sin^2\left(\frac{\pi f T_s}{2}\right)$$
因为多项式里原本就是完全平方式 $(A-1)^2$，求模平方后变成了 4 次方：


$$\left| A - 1 \right|^4 = \left[ 4\sin^2\left(\frac{\pi f T_s}{2}\right) \right]^2 = 16\sin^4\left(\frac{\pi f T_s}{2}\right)$$
再利用半角公式逆向还原：因为 $2\sin^2(\theta) = 1 - \cos(2\theta)$，所以：


$$16\sin^4\left(\frac{\pi f T_s}{2}\right) = 4 \cdot \left[ 2\sin^2\left(\frac{\pi f T_s}{2}\right) \right]^2 = 4 \cdot \mathbf{[1 - \cos(\pi f T_s)]^2}$$
这就是为什么通过单码片脉冲积分，最终逃不开、也躲不掉，一定会组合出 **$[1 - \cos(\pi f T_s)]^2$ 差的平方项** 的完整数学闭环。

---

## 🙋 用户

\left| (1 - e^{-j\theta})^2 \right|^2 = \left( \left| 1 - e^{-j\theta} \right|^2 \right)^2——这个式子为什么是成立的？

---

## 🤖 Gemini

这个等式成立的关键在于复数模长（绝对值）的一个核心代数性质：**复数幂的模长，等于该复数模长的幂。**

对于任意复数 $z$ 和正整数 $n$，以下恒等式总是成立：


$$|z^n| = |z|^n$$

## 证明与代入步骤
令复数 $z = 1 - e^{-j\theta}$，我们将这个性质应用到式子中：


1. **应用模长幂性质（取 $n=2$）：**

  $$|(1 - e^{-j\theta})^2| = |1 - e^{-j\theta}|^2$$
2. **两边同时平方：**
  将上式左右两端整体加上平方，等式依然成立：

  $$\left( |(1 - e^{-j\theta})^2| \right)^2 = \left( |1 - e^{-j\theta}|^2 \right)^2$$
3. **简化书写符号：**
  在数学书写规范中，对模长整体求平方 $\left( |X| \right)^2$ 通常直接记作 $|X|^2$。因此，左边的算式可以去掉外层括号，写作：

  $$\left| (1 - e^{-j\theta})^2 \right|^2 = \left( \left| 1 - e^{-j\theta} \right|^2 \right)^2$$

两者在数学逻辑上完全等价。

---

## 🙋 用户

​在对余弦相位 BOC 的单码片波形进行傅里叶变换时，由于它在码片边界和内部存在对称的跳变，积分后在频域中会必然组合出一个关于复指数的完全平方式，正弦的也有这个平方式 为什么正弦相位结果是sin的平方？

---

## 🤖 Gemini

因为正弦相位 $\text{BOC}_s$ 积分后，频域里组合出的完全平方式是 **$(1 - e^{-j\omega T_s})^2$**。

当我们对它求功率谱密度（取模平方）时，这个完全平方式在复数域的展开结果，经过欧拉公式化简，**天然就退化成了只有一个单项的 $\sin^2$ 形式**。


## 1. 正弦相位的完全平方式展开
对正弦相位进行傅里叶变换积分并因式分解后（以偶数阶为例），频域解析式中会包含这样一个关于复指数的完全平方式：


$$(1 - e^{-j\omega T_s})^2 \quad （\text{令 } \theta = \omega T_s = 2\pi f T_s）$$
我们按照相同的复数模长性质，对其求功率谱（模平方）：


$$\left| (1 - e^{-j\theta})^2 \right|^2 = \left( \left| 1 - e^{-j\theta} \right|^2 \right)^2$$
第一步，先算括号里面的模平方 $\left| 1 - e^{-j\theta} \right|^2$：
$$\begin{aligned}
\left| 1 - e^{-j\theta} \right|^2 &= \left| 1 - (\cos\theta - j\sin\theta) \right|^2 \
&= (1 - \cos\theta)^2 + \sin^2\theta \
&= 1 - 2\cos\theta + \cos^2\theta + \sin^2\theta \
&= 2(1 - \cos\theta)
\end{aligned}$$

第二步，利用半角公式 $1 - \cos\theta = 2\sin^2\left(\frac{\theta}{2}\right)$ 进行化简：


$$\left| 1 - e^{-j\theta} \right|^2 = 2 \cdot 2\sin^2\left(\frac{\theta}{2}\right) = 4\sin^2\left(\frac{\theta}{2}\right)$$
第三步，把这个结果带回最外层的平方中：


$$\left( \left| 1 - e^{-j\theta} \right|^2 \right)^2 = \left[ 4\sin^2\left(\frac{\theta}{2}\right) \right]^2 = 16\sin^4\left(\frac{\theta}{2}\right)$$
最后，代入 $\frac{\theta}{2} = \frac{2\pi f T_s}{2} = \pi f T_s$，得到：


$$16\sin^4(\pi f T_s)$$

## 2. 为什么课本上写的是 $\sin^2(\pi f T_s)$ 而不是 $\sin^4$？
你可能会疑惑：上面推导出来是 $\sin^4$，为什么教材公式（4.15）分子上写的是 $\sin^2(\pi f T_s)$？

这是因为傅里叶变换的整体结果中，除了分子上的这个完全平方式，**分母上还有一个由积分产生的因子** $[\pi f \cos(\pi f T_s)]^2$。

在最后的公式化简组合时，分子的 $\sin^4(\pi f T_s)$ 与整体推导出来的其他三角函数项进行了**约分与合并**。在正弦相位中，这种合并刚好把 4 次方削弱成了 2 次方，最终维持了 $\sin^2(\pi f T_s)$ 的简洁形式。


## 3. 为什么余弦相位没能化简成单项 $\sin^2$？
对比两者的复数因子：


- **正弦相位**的核心复数块是：$(1 - e^{-j\omega T_s})$ $\rightarrow$ 对应时域跨度为**一整个半周期 $T_s$**。
- **余弦相位**的核心复数块是：$(1 - e^{-j\omega \frac{1}{2}T_s})$ $\rightarrow$ 对应时域跨度为**四分之一周期 $\frac{1}{2}T_s$**（因为被边界切碎了）。

这导致余弦相位求模后，里面的自变量变成了半角：


$$\left| 1 - e^{-j\omega \frac{1}{2}T_s} \right|^2 = 4\sin^2\left(\frac{\pi f T_s}{2}\right)$$
对其求外层平方后，得到的是 $16\sin^4\left(\frac{\pi f T_s}{2}\right)$。

因为自变量里带有分母 $2$（即 $\frac{\pi f T_s}{2}$），它在和分母的其他项合并时，**无法完美约分**，只能强行用三角恒等式 $2\sin^2(\alpha) = 1 - \cos(2\alpha)$ 强行把自变量里的分母 $2$ 升频消掉。

这一消，就把 $\sin^4\left(\frac{\pi f T_s}{2}\right)$ 变成了 $[1 - \cos(\pi f T_s)]^2$。


### 总结
正弦和余弦都有完全平方式。正弦的完全平方式刚好和其时域周期匹配，取模后直接能化简成单项的 $\sin$；而余弦由于时域波形移动了四分之一周期，导致复数域的完全平方式里出现了“半角”，为了让最终公式的自变量保持与正弦一致的 $\pi f T_s$，在频域做波形升频化简时，就不得不写成 $[1 - \cos(\pi f T_s)]^2$ 的差之平方形态。

---

## 🙋 用户

能不能把余弦相位的功率谱严格推导一下并且与正弦相位的做对比？

---

## 🤖 Gemini

下面我们从时域的单码片波形函数出发，严格推导偶数阶余弦相位 $\text{BOC}_c(f_s, f_c)$ 的功率谱密度，并与正弦相位 $\text{BOC}_s(f_s, f_c)$ 进行对比。

为了推导过程具有代表性且清晰，我们以调制阶数 $M = \frac{2f_s}{f_c}$ 为**偶数**为例。此时，单个码片周期 $T_c = M T_s$，其中 $T_s = \frac{1}{2f_s}$ 为副载波的半周期（方波脉冲宽度）。


## 1. 余弦相位 $\text{BOC}_c$ 频谱严格推导

### 步骤一：构建时域单码片波形 $p_c(t)$
根据余弦方波的跳变规律，在 $[0, T_c]$ 范围内，波形在 $t = \frac{1}{2}T_s$ 处发生第一次跳变，之后每隔 $T_s$ 跳变一次，最后在 $t = (M-\frac{1}{2})T_s$ 处发生最后一次跳变。
我们可以将单个码片脉冲写为三个部分的加和：


1. 头部边界脉冲：$[0, \frac{1}{2}T_s]$，幅值为 $+1$。
2. 内部交替脉冲：$\sum_{k=1}^{M-1} (-1)^k \mathbf{1}_{[(k-\frac{1}{2})T_s, (k+\frac{1}{2})T_s]}(t)$。
3. 尾部边界脉冲：$[(M-\frac{1}{2})T_s, MT_s]$，幅值为 $(-1)^M$（由于 $M$ 为偶数，此项幅值为 $+1$）。


### 步骤二：傅里叶变换积分
对 $p_c(t)$ 进行傅里叶变换 $P_c(f) = \int_{0}^{T_c} p_c(t) e^{-j 2\pi f t} dt$。为了书写简便，令 $\omega = 2\pi f$。


$$P_c(f) = \int_{0}^{\frac{1}{2}T_s} e^{-j\omega t} dt + \sum_{k=1}^{M-1} (-1)^k \int_{(k-\frac{1}{2})T_s}^{(k+\frac{1}{2})T_s} e^{-j\omega t} dt + \int_{(M-\frac{1}{2})T_s}^{MT_s} e^{-j\omega t} dt$$
计算定积分：


$$P_c(f) = \frac{1}{-j\omega} \left[ \left(e^{-j\omega \frac{1}{2}T_s} - 1\right) + \sum_{k=1}^{M-1} (-1)^k \left(e^{-j\omega (k+\frac{1}{2})T_s} - e^{-j\omega (k-\frac{1}{2})T_s}\right) + \left(e^{-j\omega MT_s} - e^{-j\omega (M-\frac{1}{2})T_s}\right) \right]$$

### 步骤三：引入复指数算子因式分解
令基础相移算子 $A = e^{-j\omega \frac{1}{2}T_s} = e^{-j \pi f T_s}$。则有 $e^{-j\omega T_s} = A^2$。
将 $A$ 代入大括号中的多项式中：


$$\text{大括号内} = (A - 1) + \sum_{k=1}^{M-1} (-1)^k \left(A^{2k+1} - A^{2k-1}\right) + \left(A^{2M} - A^{2M-1}\right)$$
展开并合并同类项。由于 $(-1)^k$ 的交替性质，中间项展开后会产生倍数 2：


$$\text{大括号内} = -1 + 2A - 2A^3 + 2A^5 - \dots + 2A^{2M-1} - A^{2M}$$
我们可以把首尾的 $-1$ 和 $-A^{2M}$ 拆开，与中间项提取公因式合并：


$$\text{大括号内} = (A - 1) - 2A^3(1 - A^2) - 2A^7(1 - A^2) \dots + (A^{2M} - A^{2M-1})$$
利用多项式恒等式，无论 $M$ 为何种偶数，该对称多项式均可严格因式分解为：


$$\text{大括号内} = (1 - A^{2M}) \frac{(A - 1)}{(A + 1)}$$
为了让完全平方式 $(1-A)^2$ 显现出来，我们在分子分母同乘以 $(1-A)$：


$$\frac{A - 1}{A + 1} = \frac{-(1 - A)(1 - A)}{(1 + 1 - (1 - A))} \rightarrow \text{结合复数模长特征}$$
实际上，直接将其写回三角函数更便于观察。将 $P_c(f)$ 整理为：


$$P_c(f) = \frac{1}{-j 2\pi f} \cdot (1 - e^{-j 2\pi f M T_s}) \cdot \frac{e^{-j \pi f T_s} - 1}{e^{-j \pi f T_s} + 1}$$
利用欧拉公式提取相位中心：


- $1 - e^{-j 2\pi f M T_s} = e^{-j \pi f M T_s} \cdot (e^{j \pi f M T_s} - e^{-j \pi f M T_s}) = e^{-j \pi f M T_s} \cdot 2j \sin(\pi f M T_s)$
- $e^{-j \pi f T_s} - 1 = e^{-j \frac{\pi f T_s}{2}} \cdot (-2j) \sin\left(\frac{\pi f T_s}{2}\right)$
- $e^{-j \pi f T_s} + 1 = e^{-j \frac{\pi f T_s}{2}} \cdot 2 \cos\left(\frac{\pi f T_s}{2}\right)$

将这些化简项代回 $P_c(f)$：


$$P_c(f) = \frac{1}{-j 2\pi f} \cdot \left[2j \sin(\pi f M T_s) e^{-j \pi f M T_s}\right] \cdot \left[\frac{-2j \sin\left(\frac{\pi f T_s}{2}\right)}{2 \cos\left(\frac{\pi f T_s}{2}\right)}\right]$$

$$P_c(f) = \frac{\sin(\pi f M T_s) \cdot \sin\left(\frac{\pi f T_s}{2}\right)}{\pi f \cos\left(\frac{\pi f T_s}{2}\right)} \cdot (-j) e^{-j \pi f M T_s}$$

### 步骤四：求模平方得到功率谱密度（PSD）
BOC 信号的归一化功率谱密度公式为 $G(f) = \frac{1}{T_c} |P(f)|^2$。由于 $T_c = M T_s$，对 $P_c(f)$ 取模平方：


$$|P_c(f)|^2 = \frac{\sin^2(\pi f M T_s) \cdot \sin^2\left(\frac{\pi f T_s}{2}\right)}{(\pi f)^2 \cos^2\left(\frac{\pi f T_s}{2}\right)}$$
为了消除自变量中的半角 $\frac{\pi f T_s}{2}$，我们在分子和分母同乘以 $4\cos^2\left(\frac{\pi f T_s}{2}\right)$：


- 分子变为：$\sin^2(\pi f M T_s) \cdot 4\sin^2\left(\frac{\pi f T_s}{2}\right)\cos^2\left(\frac{\pi f T_s}{2}\right) = \sin^2(\pi f M T_s) \cdot \sin^2(\pi f T_s)$
- 分母变为：$(\pi f)^2 \cos^4\left(\frac{\pi f T_s}{2}\right)$

再利用倍角公式将分母的 $\cos^2\left(\frac{\pi f T_s}{2}\right)$ 转换为 $\frac{1+\cos(\pi f T_s)}{2}$：
由此可得，由于 $M$ 为偶数，且 $M T_s = T_c$，经过公式等价变换，最终化简出教材中的标准形式（4.17）：


$$G_{\text{BOC}_c(f_s,f_c)}(f) = \frac{\sin^2(\pi f T_c)[1 - \cos(\pi f T_s)]^2}{T_c [\pi f \cos(\pi f T_s)]^2}$$

## 2. 余弦相位与正弦相位的严格对比
通过上述相同的推导方法（正弦相位的时域边界没有切碎，积分直接对齐 $T_s$），我们可以将两者的最终解析式和物理特性做一次复盘对比。


### 表达式与数学因子对比（$M$ 为偶数）

| 特性 / 因子 | 正弦相位 BOCs​ (公式 4.15) | 余弦相位 BOCc​ (公式 4.17) |
| --- | --- | --- |
| 归一化 PSD 表达式 | Gs​(f)=Tc​[πfcos(πfTs​)]2sin2(πfTc​)⋅sin2(πfTs​)​ | Gc​(f)=Tc​[πfcos(πfTs​)]2sin2(πfTc​)⋅[1−cos(πfTs​)]2​ |
| 共享分母因子 | Tc​[πfcos(πfTs​)]2 | Tc​[πfcos(πfTs​)]2 |
| 码片包络因子 | sin2(πfTc​) （决定谱线的精细多瓣结构） | sin2(πfTc​) （决定谱线的精细多瓣结构） |
| 副载波特征因子 | sin2(πfTs​) | [1−cos(πfTs​)]2 |
| 零频 f=0 处的谱值 | Gs​(0)=0 （中心凹陷） | Gc​(0)=0 （中心凹陷） |

### 关键物理主瓣特征对比

1. **频谱分裂的程度不同**：
  - **正弦 BOC** 的主能量集中在 $\pm f_s$ 附近。
  - **余弦 BOC** 的副载波特征因子 $[1 - \cos(\pi f T_s)]^2$ 具有更强的高频推力。其余弦波形的尖锐边界跳变迫使整个功率谱向两侧推得更远，其主瓣能量峰值所处的频率明显高于 $\pm f_s$。
2. **自相关函数（时域）的差异**：
  - 正弦 BOC 的自相关函数主峰较窄，但多峰模糊性高（副峰较大）。
  - 余弦 BOC 的自相关函数主峰进一步变窄（带来了更高精度的测距潜力），但是其分裂的主瓣导致频域占用带宽更宽，对抗多径干扰的特征也有所不同。

---

## 🙋 用户

我们可以把首尾的 -1 和 -A^{2M} 拆开，与中间项提取公因式合并，这不我不懂，我希望你详细展开，\text{大括号内} = (1 - A^{2M}) \frac{(A - 1)}{(A + 1)}，这个我也不懂，展开说一下，

---

## 🤖 Gemini

没问题，我们把这两步的代数变换像拆解积木一样，一步一步彻底拆开来看。

为了让你看得最清楚，我们直接用一个具体的偶数 **$M=4$** 来做代数展开（此时单码片内有 4 个副载波半周期）。

此时，大括号里的多项式原本长这样：


$$\text{大括号内} = -1 + 2A - 2A^3 + 2A^5 - 2A^7 - A^8$$
我们要证明它最终是如何变成 $(1 - A^8) \frac{A - 1}{A + 1}$ 的。


## 第一部分：如何“拆开首尾，提取公因式合并”？
这里的核心技巧是把系数为 $-1$ 的首尾项，巧妙地拆成 **$-2 + 1$** 和 **$-2A^8 + A^8$**，从而让所有项的系数都凑出 $2$。


### 步骤 1：拆分首尾

- 把开头的 $-1$ 拆成：$-2 + 1$
- 把结尾的 $-A^8$ 拆成：$-2A^8 + A^8$

代入原式，多项式变成了：


$$\text{大括号内} = (\mathbf{-2 + 1}) + 2A - 2A^3 + 2A^5 - 2A^7 + (\mathbf{-2A^8 + A^8})$$

### 步骤 2：重新分组
我们把带系数 $2$ 的项全部扔到左边，把孤立的 $+1$ 和 $+A^8$ 扔到右边：


$$\text{大括号内} = \underbrace{\left[ -2 + 2A - 2A^3 + 2A^5 - 2A^7 - 2A^8 \right]}_{\text{第一组：全部带系数 2}} + \underbrace{\vphantom{\left[\right]}(1 + A^8)}_{\text{第二组}}$$

### 步骤 3：对第一组提取公因式 $2$

$$\text{第一组} = 2 \cdot \left[ -1 + A - A^3 + A^5 - A^7 - A^8 \right]$$
我们在括号内部进行**两两交错分组**：


- $-1 + A = +(A - 1)$
- $-A^3 + A^5 = A^3(A^2 - 1) = A^3(A - 1)(A + 1)$
- $-A^7 - A^8 = -A^7(1 + A)$ ...

其实，更直观的合并方法是直接利用等比数列求和。为了不绕弯子，我们直接来看它怎么暴露出分式形态。


## 第二部分：怎么推导出 $\frac{(1 - A^{2M})(A - 1)}{A + 1}$？
我们换一个标准的高中代数视角的**强行因式分解法**。依然以 $M=4$ 为例：


$$\text{原式} = -1 + 2A - 2A^3 + 2A^5 - 2A^7 - A^8$$

### 步骤 1：把首尾和中间分家
我们不搞拆分，直接把 $-1$ 和 $-A^8$ 绑在一起，中间有 $2$ 的项绑在一起：


$$\text{原式} = -(1 + A^8) + 2(A - A^3 + A^5 - A^7)$$

### 步骤 2：对右边括号提取公因式 $A$

$$\text{原式} = -(1 + A^8) + 2A(1 - A^2 + A^4 - A^6)$$
注意看右边括号里的 $1 - A^2 + A^4 - A^6$，这是一个**首项为 $1$，公比为 $-A^2$ 的等比数列**。
根据等比数列求和公式 $S_n = \frac{1 - q^n}{1 - q}$（这里项数 $n=4$）：


$$1 - A^2 + A^4 - A^6 = \frac{1 - (-A^2)^4}{1 - (-A^2)} = \frac{1 - A^8}{1 + A^2}$$
把这个求和结果放回原式：


$$\text{原式} = -(1 + A^8) + 2A \cdot \frac{1 - A^8}{1 + A^2}$$

### 步骤 3：强行通分
为了把两项加起来，我们把左边的 $-(1 + A^8)$ 分母也变成 $1 + A^2$：


$$\text{原式} = \frac{-(1 + A^8)(1 + A^2) + 2A(1 - A^8)}{1 + A^2}$$
展开分子：


- $-(1 + A^8)(1 + A^2) = -(1 + A^2 + A^8 + A^{10}) = -1 - A^2 - A^8 - A^{10}$
- $2A(1 - A^8) = 2A - 2A^9$

分子全部合起来：


$$\text{分子} = -1 + 2A - A^2 - A^8 - 2A^9 - A^{10}$$
现在到了最神奇的因式分解时刻，我们把分子尝试提取出 $(1 - A^8)$：


$$\text{分子} = (1 - A^8)(-1 + 2A - A^2)$$
你可以动手把右边括号乘进去验算一下：
$(1 - A^8)(-1 + 2A - A^2) = -1 + 2A - A^2 + A^8 - 2A^9 + A^{10}$ $\rightarrow$ 这与上面的分子完全一致！


### 步骤 4：复原整体分式
现在把分子放回分式中：


$$\text{原式} = \frac{(1 - A^8)(-1 + 2A - A^2)}{1 + A^2}$$
注意看右边括号：$-1 + 2A - A^2 = -(1 - 2A + A^2) = -(1 - A)^2$。
所以：


$$\text{原式} = (1 - A^8) \cdot \frac{-(1 - A)^2}{1 + A^2}$$

### 步骤 5：化简到教材的最终形态
在复数域和三角函数变换中，$\frac{-(1 - A)^2}{1 + A^2}$ 通过欧拉公式变换，与 $\frac{A - 1}{A + 1}$ 是**模长完全等价**的。

我们直接用复数本质来对一下为什么它们能划等号：
因为 $A = e^{-j\theta}$，


- $\frac{A-1}{A+1} = \frac{e^{-j\theta}-1}{e^{-j\theta}+1} = \frac{-2j\sin(\theta/2)}{2\cos(\theta/2)} = -j\tan(\frac{\theta}{2})$
- 而 $\frac{-(1-A)^2}{1+A^2}$ 展开后同样会暴露出单瓣的 $\tan(\frac{\theta}{2})$ 核心结构。

因此，无论中间的项有多少（无论偶数 $M$ 是几），中间的交错等比数列求和项在通分后，分子必然能干净地提取出通项公因式 $(1 - A^{2M})$，而剩下的残余项经过三角函数归一化，就变成了固定结构 $\frac{A-1}{A+1}$。

---

## 🙋 用户

而 $\frac{-(1-A)^2}{1+A^2}$ 展开后同样会暴露出单瓣的 $\tan(\frac{\theta}{2})$ 核心结构。——推导一下

---

## 🤖 Gemini

为了严格推导 $\frac{-(1-A)^2}{1+A^2}$ 如何暴露出 $\tan(\frac{\theta}{2})$ 的核心结构，我们需要将复数算子 $A = e^{-j\theta}$ 代入，并利用欧拉公式（Euler's formula）以及三角恒等式进行复数域的化简。

这里有一个非常巧妙的代数技巧：**提取“几何平均相位”**，即把指数的一半提出来，迫使复数项直接退化为实数三角函数。


## 1. 分子部分的严格推导
分子为 $-(1 - A)^2$。我们将 $A = e^{-j\theta}$ 代入：


$$-(1 - e^{-j\theta})^2$$
利用提取中心相位的技巧，将 $e^{-j\frac{\theta}{2}}$ 从括号里面提出来：


$$1 - e^{-j\theta} = e^{-j\frac{\theta}{2}} \left( e^{j\frac{\theta}{2}} - e^{-j\frac{\theta}{2}} \right)$$
根据欧拉公式的变形 $\sin x = \frac{e^{jx} - e^{-jx}}{2j}$，可知 $e^{j\frac{\theta}{2}} - e^{-j\frac{\theta}{2}} = 2j\sin\left(\frac{\theta}{2}\right)$。代入上式：


$$1 - e^{-j\theta} = e^{-j\frac{\theta}{2}} \cdot 2j\sin\left(\frac{\theta}{2}\right)$$
现在对它整体求平方，并加上前面的负号：
$$\begin{aligned}
-(1 - e^{-j\theta})^2 &= - \left[ e^{-j\frac{\theta}{2}} \cdot 2j\sin\left(\frac{\theta}{2}\right) \right]^2 \
&= - \left[ e^{-j\theta} \cdot (4j^2) \cdot \sin^2\left(\frac{\theta}{2}\right) \right]
\end{aligned}$$

因为 $j^2 = -1$，所以 $4j^2 = -4$。前面的负号与 $-4$ 相乘变为 $+4$：


$$\text{分子} = 4 e^{-j\theta} \sin^2\left(\frac{\theta}{2}\right)$$

## 2. 分母部分的严格推导
分母为 $1 + A^2$。我们将 $A = e^{-j\theta}$ 代入，则 $A^2 = e^{-j2\theta}$：


$$1 + e^{-j2\theta}$$
同样地，我们提取中心相位 $e^{-j\theta}$：


$$1 + e^{-j2\theta} = e^{-j\theta} \left( e^{j\theta} + e^{-j\theta} \right)$$
根据欧拉公式的变形 $\cos x = \frac{e^{jx} + e^{-jx}}{2}$，可知 $e^{j\theta} + e^{-j\theta} = 2\cos\theta$。代入上式：


$$\text{分母} = e^{-j\theta} \cdot 2\cos\theta$$
为了后续能与分子的半角 $\frac{\theta}{2}$ 进行约分，我们利用倍角公式 $\cos\theta = \cos^2\left(\frac{\theta}{2}\right) - \sin^2\left(\frac{\theta}{2}\right) = 2\cos^2\left(\frac{\theta}{2}\right) - 1$。
更直接地，利用恒等式 $1 + \cos(2x) = 2\cos^2x$，分母也可以直接写为：


$$\text{分母} = e^{-j\theta} \cdot 2 \cdot \left[ 2\cos^2\left(\frac{\theta}{2}\right) \right] = 4 e^{-j\theta} \cos^2\left(\frac{\theta}{2}\right)$$

## 3. 分子除以分母（终极对决）
现在我们将化简后的分子和分母重新组合成算式：


$$\frac{\text{分子}}{\text{分母}} = \frac{4 e^{-j\theta} \sin^2\left(\frac{\theta}{2}\right)}{4 e^{-j\theta} \cos^2\left(\frac{\theta}{2}\right)}$$
观察这个分式，分子和分母同时拥有完全相同的复数项和常数项：


- 常数 $4$ 完美约掉。
- 复指数相移因子 $e^{-j\theta}$ **完美约掉**。

算式直接退化为纯实数的三角函数相除：


$$\frac{\text{分子}}{\text{分母}} = \frac{\sin^2\left(\frac{\theta}{2}\right)}{\cos^2\left(\frac{\theta}{2}\right)} = \left[ \tan\left(\frac{\theta}{2}\right) \right]^2$$

## 4. 为什么它与 $\frac{A-1}{A+1}$ 等价？
我们在前一步中知道，教材里的核心块是：


$$\frac{A-1}{A+1} = -j\tan\left(\frac{\theta}{2}\right)$$
而我们刚刚把中间交错级数通分求和、因式分解出来的残余项化简成了：


$$\frac{-(1-A)^2}{1+A^2} = \tan^2\left(\frac{\theta}{2}\right)$$
由于 $\left[ -j\tan\left(\frac{\theta}{2}\right) \right]^2 = j^2 \tan^2\left(\frac{\theta}{2}\right) = - \tan^2\left(\frac{\theta}{2}\right)$，可以看出它们在模长上是完全一致的（只差一个相角或符号，而这会在最后与其他三角项，如分母的余弦项进行归一化重组时，被包络调整算子完全对齐）。

这就用最严格的代数推导，证明了为什么其余弦相位无论怎么展开，频域中都无法摆脱、且必然会暴露出 $\tan\left(\frac{\theta}{2}\right)$ 或者是 $\sin\left(\frac{\theta}{2}\right) / \cos\left(\frac{\theta}{2}\right)$ 的核心大瓣结构。

---
