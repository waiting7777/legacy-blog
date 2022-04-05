---
title: "Controlled and Uncontrolled Component in React"

tags: React

category: Engineering

excerpt: 你可能聽過很多文章說 "不要用 setState"，但也看過別的文件說 “ref 不好”，那麼到底應該要怎做，或是啥情況下應該選擇哪一種呢？

date: 2021-11-12

image: ./images/control-component.png

image_caption: react

author: author1

slug: controlled-and-uncontrolled-component-in-react
---

先來看看什麼是 `controlled` 什麼是 `uncontrolled` component。

## The Uncontrolled

uncontrolled 的通常就像傳統的 HTML input，內部自己紀錄了 input 的值。

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

這是最簡單的實現，它保持了 dom 裡唯一的真相來源，是個簡單又快速的實現，但可能不太夠用，因為得想辦法把值傳出去，如果表單需要驗證或是其他處理的時候，會導致很難修改。

## The Controlled

controlled input 把 value 當作 props 來使用，並且在 onChange 接 handler 處理 value

```jsx
class Form extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    };
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>
    );
  }
}
```

這樣做的好處是因為 value 就在 state 裏面，所以 UI 可以馬上做回應：

- 驗證可以馬上做，不用等到 submit
- 強化 input 格式，像是電話號碼或是信用卡號碼

但如果你不需要做這些，那麼 uncontroll 比較簡單。

## 到底該選哪個？

![source: [https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/](https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/)](./images/controll.png)

source: [https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/](https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/)

會有這篇文章是因為，在製作 component 的時候，因為自己的使用情境很簡單，所以做了個 uncontrolled 的版本，但給別人用的時候，原先做了個簡單版本 uncontrolled，自己 maintain 了狀態然後生了 onChange 告訴上層狀態的變化，但因為他想對狀態做後處理，然後擔心他的狀態跟組件的狀態不一致，所以最後還是改了 controlled 版本出來，並且讓 component 是兩種兼容的。

## 結論

想要簡單快速，uncontrolled 版本就好，想要複雜功能還是把問題都讓用 component 的人去 controll 就好。看你的使用情境來決定，至於是做 component 的話，或許比想像中的還複雜，想要足夠好用就得兩種都做。

## 同場加映

過去用 vue 在做 component 時，其實只有 controlled 版本，因為 vue 有語法糖 `v-model` 導致大家都約定成俗這樣做，所以也就沒這個額外的煩惱。

## Reference:

[https://zh-hant.reactjs.org/docs/uncontrolled-components.html](https://zh-hant.reactjs.org/docs/uncontrolled-components.html)

[https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/](https://goshacmd.com/controlled-vs-uncontrolled-inputs-react/)