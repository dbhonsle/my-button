const template = document.createElement('template');
template.innerHTML = `
  <style>
    .container {
      padding: 8px;
    }
    button {
      display: block;
      overflow: hidden;
      position: relative;
      padding: 0 16px;
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      width: 100%;
      height: 40px;
      box-sizing: border-box;
      border: 1px solid #a1a1a1;
      background: #ffffff;
      box-shadow: 0 2px 4px 0 rgba(0,0,0, 0.05), 0 2px 8px 0 rgba(161,161,161, 0.4);
      color: #363636;
      cursor: pointer;
    }
  </style>
  <div class="container">
    <button>Label</button>
  </div>
`;
class Button extends HTMLElement {
  constructor() {
    super();
    this._onButtonClick = this._onButtonClick.bind(this);
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
    /* Purely Experimantal 
    this.$div = this._shadowRoot.querySelector('div')
    console.log("For Wrapper");
    console.log(this.$div.offsetHeight + "   " + this.$div.offsetWidth);
    console.log(this.$div.clientHeight + "   " + this.$div.clientWidth);
     Purely Experimantal */
    this.$button = this._shadowRoot.querySelector('button')
    /*
    this.$button.addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('onClick', {
            detail: 'Hello from within the Custom Element',
          })
        );
      });
    */
  }

  connectedCallback() {
    this.$button.addEventListener('click',this._onButtonClick);
  }

  disconnectedCallback() {
    this.removeEventListener('click',this._onButtonClick);
  }

  _onButtonClick() {
    this.dispatchEvent(
      new CustomEvent('onClick', {
        detail: 'Hello from within the Custom Element',
      })
    );
  }
  
  static get observedAttributes() {
    return ['label'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;
    this.render();
  }
  render() {
    this.$button.innerHTML = this.label;
  }
}
window.customElements.define('my-button', Button);