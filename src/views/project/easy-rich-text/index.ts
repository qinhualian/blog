import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class EasyRichText extends Vue {
  public formulaConfig = [
    { fn: "AND()", desc: "返回1当条件判断为TRUE" },
    { fn: "OR()", desc: "返回1当条件判断为TRUE" },
    { fn: "NOT()", desc: "返回1当条件判断为TRUE" },
    { fn: "IF()", desc: "单个或多条件表达式" },
    { fn: "CASE()", desc: "单个或多条件表达式" },

    { fn: "ROW()", desc: "取当前行的序号，返回数值格式" },
  ];
  public tagList: any = [];
  public position: any = "";

  public created() {
    for (let i = 0; i < 6; i++) {
      this.tagList.push({ title: "标签" + (i + 1) });
    }
  }

  public blurExprBox() {
    this.position = window.getSelection()?.getRangeAt(0); // 返回一个包含当前选区内容的区域对象
  }
  public handleAddFn(title: string, item2: any) {
    const content = title === "函数" ? item2.fn : item2.title;
    // 如果div没有光标，则在div内容末尾插入
    if (this.position === "") {
      this.positionToEnd();
    }
    if (title === "函数") {
      // 插入函数名称
      this.insertText(content);
    } else {
      // 创建一个元素
      this.insertTag(content);
    }
  }
  /**
   * 插入一个标签<span class='tag'></span>
   */
  public insertTag(content: string) {
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.appendChild(document.createTextNode(content));
    // 插入的标签不可编辑，设置contenteditable为false
    tag.setAttribute("contenteditable", "false");
    //为了显示光标先插入一个空格
    this.insertText(" ");
    // 插入标签
    this.position.insertNode(tag); // 是在Range的起始位置插入节点的方法
    this.positionToEnd();
  }

  /**
   * 插入一个文本 例如函数名称fn
   */
  public insertText(content: string) {
    const text = document.createTextNode(content);
    this.position.insertNode(text);
    const range: any = window.getSelection();
    range.setPosition(text, text.length - 1);
    this.position = window.getSelection()?.getRangeAt(0);
  }

  /**
   * 光标定位到最后
   */
  public positionToEnd() {
    const div: any = this.$refs.formulaTextArea;
    div.focus();
    const range: any = window.getSelection(); // 返回一个 Selection 对象，表示用户选择的文本范围或光标的当前位置
    range.selectAllChildren(div); // 把指定元素的所有子元素设为选中区域，并取消之前的选中区域。
    range.collapseToEnd(); // 方法的作用是取消当前选区，并把光标定位在原选区的最末尾处
    this.position = window.getSelection()?.getRangeAt(0); // 返回一个包含当前选区内容的区域对象
  }
}
