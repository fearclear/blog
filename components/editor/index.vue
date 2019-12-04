<template>
  <div class="bf-container" :class="{'fullscreen': fullscreen}" @keydown="handleKeyDown">
    <editor-menu-bar v-slot="{ commands, isActive, getMarkAttrs }" :editor="editor">
      <div class="bf-controlbar">
        <button
          type="button"
          data-title="撤销"
          class="control-item button"
          :disabled="!commands.undoDepth()"
          @click="commands.undo"
        >
          <i class="bfi-undo" />
        </button>
        <button
          type="button"
          data-title="重做"
          class="control-item button"
          :disabled="!commands.redoDepth()"
          @click="commands.redo"
        >
          <i class="bfi-redo" />
        </button>
        <span class="separator-line" />
        <Dropdown
          trigger="custom"
          :visible="dropdownform.fontSize"
          class="bf-dropdown control-item dropdown bf-font-size-dropdown"
          :class="{'active': dropdownform.fontSize}"
          @on-clickoutside="handleClose('fontSize')"
          @on-click="handleItem(commands.font_size({level: $event}))"
        >
          <button
            type="button"
            class="dropdown-handler"
            data-title="字号"
            @click="handleOpen('fontSize')"
          >
            <span>{{ getMarkAttrs('font_size').level||'字号' }}</span>
            <i class="bfi-drop-down" />
          </button>
          <DropdownMenu
            slot="list"
            class="dropdown-content"
            style="margin-left: 0px;margin-top:-7px;"
          >
            <i class="dropdown-arrow" style="margin-left: 0px;" />
            <div class="dropdown-content-inner">
              <ul class="bf-font-sizes">
                <DropdownItem
                  v-for="(item, index) in menuParams.fontSize"
                  :key="index"
                  :name="item"
                  :class="{'active': getMarkAttrs('font_size').level === item}"
                >
                  {{ item }}
                </DropdownItem>
              </ul>
            </div>
          </DropdownMenu>
        </Dropdown>
        <Dropdown
          trigger="custom"
          :visible="dropdownform.lineHeight"
          class="bf-dropdown control-item dropdown bf-line-height-dropdown"
          :class="{'active': dropdownform.lineHeight}"
          @on-clickoutside="handleClose('lineHeight')"
          @on-click="handleItem(commands.line_height({level: $event}))"
        >
          <button
            type="button"
            class="dropdown-handler"
            data-title="行高"
            :disabled="isActive.bullet_list()||isActive.ordered_list()||isActive.text_align()"
            @click="handleOpen('lineHeight')"
          >
            <span>{{ menuParams.lineHeight.find(level => isActive.line_height({level})) ||'行高' }}</span>
            <i class="bfi-drop-down" />
          </button>
          <DropdownMenu
            slot="list"
            class="dropdown-content"
            style="margin-left: 0px;margin-top:-7px;"
          >
            <i class="dropdown-arrow" style="margin-left: 0px;" />
            <div class="dropdown-content-inner">
              <ul class="bf-line-heights">
                <DropdownItem
                  v-for="(item, index) in menuParams.lineHeight"
                  :key="index"
                  :name="item"
                >
                  {{ item }}
                </DropdownItem>
              </ul>
            </div>
          </DropdownMenu>
        </Dropdown>
        <Dropdown
          trigger="custom"
          :visible="dropdownform.letterSpacing"
          class="bf-dropdown control-item dropdown bf-letter-spacing-dropdown"
          :class="{'active': dropdownform.letterSpacing}"
          @on-clickoutside="handleClose('letterSpacing')"
          @on-click="handleItem(commands.letter_spacing({level: $event}))"
        >
          <button
            type="button"
            class="dropdown-handler"
            data-title="字间距"
            @click="handleOpen('letterSpacing')"
          >
            <span>{{ getMarkAttrs('letter_spacing').level||'字间距' }}</span>
            <i class="bfi-drop-down" />
          </button>
          <DropdownMenu
            slot="list"
            class="dropdown-content"
            style="margin-left: 0px;margin-top:-7px;"
          >
            <i class="dropdown-arrow" style="margin-left: 0px;" />
            <div class="dropdown-content-inner">
              <ul class="bf-letter-spacings">
                <DropdownItem
                  v-for="(item, index) in menuParams.letterSpacing"
                  :key="index"
                  :name="item"
                  :class="{'active': getMarkAttrs('letter_spacing').level === item}"
                >
                  {{ item }}
                </DropdownItem>
              </ul>
            </div>
          </DropdownMenu>
        </Dropdown>
        <span class="separator-line" />
        <Dropdown
          trigger="custom"
          :visible="dropdownform.textColor"
          class="bf-dropdown control-item dropdown text-color-dropdown"
          :class="{'active': dropdownform.textColor}"
          @on-clickoutside="handleClose('textColor')"
          @on-click="dropdownform.textColorIndex === 0?
            commands.text_color({color:$event, backgroundColor: getMarkAttrs('text_color').backgroundColor}):
            commands.text_color({backgroundColor:$event, color: getMarkAttrs('text_color').color})"
        >
          <button
            type="button"
            class="dropdown-handler"
            data-title="颜色"
            @click="handleOpen('textColor')"
          >
            <span>
              <i class="bfi-text-color">
                <span class="path1" :style="{color:getMarkAttrs('text_color').backgroundColor}" />
                <span class="path2" :style="{color:getMarkAttrs('text_color').color}" />
              </i>
            </span>
          </button>
          <DropdownMenu
            slot="list"
            class="dropdown-content"
            style="margin-left: 0px;margin-top:-7px;"
          >
            <i class="dropdown-arrow" style="margin-left: 0px;" />
            <div class="dropdown-content-inner">
              <div class="bf-text-color-picker-wrap">
                <div class="bf-color-switch-buttons">
                  <button
                    type="button"
                    data-type="color"
                    :class="{'active':dropdownform.textColorIndex === 0}"
                    @click="dropdownform.textColorIndex = 0"
                  >
                    文字颜色
                  </button>
                  <button
                    type="button"
                    data-type="background-color"
                    :class="{'active':dropdownform.textColorIndex === 1}"
                    @click="dropdownform.textColorIndex = 1"
                  >
                    背景颜色
                  </button>
                </div>
                <div class="bf-colors-wrap">
                  <ul class="bf-colors">
                    <DropdownItem
                      v-for="(item, index) in menuParams.textColor"
                      :key="index"
                      :title="item"
                      :style="{color: item}"
                      class="color-item"
                      :name="item"
                    />
                  </ul>
                </div>
              </div>
            </div>
          </DropdownMenu>
        </Dropdown>
        <button
          type="button"
          data-title="加粗"
          class="control-item button"
          :class="{ 'active': isActive.bold() }"
          @click="commands.bold"
        >
          <i class="bfi-bold" />
        </button>
        <button
          type="button"
          data-title="斜体"
          class="control-item button"
          :class="{ 'active': isActive.italic() }"
          @click="commands.italic"
        >
          <i class="bfi-italic" />
        </button>
        <button
          type="button"
          data-title="下划线"
          class="control-item button"
          :class="{ 'active': isActive.underline() }"
          @click="commands.underline"
        >
          <i class="bfi-underlined" />
        </button>
        <button
          type="button"
          data-title="删除线"
          class="control-item button"
          :class="{ 'active': isActive.strike() }"
          @click="commands.strike"
        >
          <i class="bfi-strikethrough" />
        </button>
        <span class="separator-line" />
        <button
          type="button"
          data-title="上标"
          class="control-item button"
          :class="{ 'active': isActive.super_script() }"
          @click="commands.super_script"
        >
          <i class="bfi-superscript" />
        </button>
        <button
          type="button"
          data-title="下标"
          class="control-item button"
          :class="{ 'active': isActive.sub_script() }"
          @click="commands.sub_script"
        >
          <i class="bfi-subscript" />
        </button>
        <button
          type="button"
          data-title="清除样式"
          class="control-item button"
          @click="commands.clear_format"
        >
          <i class="bfi-format_clear" />
        </button>
        <Dropdown
          trigger="custom"
          :visible="dropdownform.emoji"
          class="bf-dropdown control-item dropdown bf-emoji-dropdown"
          :class="{'active': dropdownform.emoji}"
          @on-clickoutside="handleClose('emoji')"
          @on-click="editor.commands.emoji($event)"
        >
          <button
            type="button"
            class="dropdown-handler"
            data-title="小表情"
            @click="handleOpen('emoji')"
          >
            <span>
              <i class="bfi-emoji" />
            </span>
          </button>
          <DropdownMenu
            slot="list"
            class="dropdown-content"
            style="margin-left: 0px;margin-top:-7px;"
          >
            <i class="dropdown-arrow" style="margin-left: 0px;" />
            <div class="dropdown-content-inner">
              <div class="bf-emojis-wrap">
                <ul class="bf-emojis">
                  <DropdownItem
                    v-for="(item, index) in menuParams.emoji"
                    :key="index"
                    :name="item"
                  >
                    {{ item }}
                  </DropdownItem>
                </ul>
              </div>
            </div>
          </DropdownMenu>
        </Dropdown>
        <span class="separator-line" />
        <button
          type="button"
          data-title="居左"
          data-alignment="left"
          class="control-item button null"
          :class="{ 'active': isActive.text_align({level: 'left'}) }"
          :disabled="isActive.bullet_list()||isActive.ordered_list()||isActive.line_height()"
          @click="commands.text_align({level: 'left'})"
        >
          <i class="bfi-align-left" />
        </button>
        <button
          type="button"
          data-title="居中"
          data-alignment="center"
          class="control-item button null"
          :class="{ 'active': isActive.text_align({level: 'center'}) }"
          :disabled="isActive.bullet_list()||isActive.ordered_list()||isActive.line_height()"
          @click="commands.text_align({level: 'center'})"
        >
          <i class="bfi-align-center" />
        </button>
        <button
          type="button"
          data-title="居右"
          data-alignment="right"
          class="control-item button null"
          :class="{ 'active': isActive.text_align({level: 'right'}) }"
          :disabled="isActive.bullet_list()||isActive.ordered_list()||isActive.line_height()"
          @click="commands.text_align({level: 'right'})"
        >
          <i class="bfi-align-right" />
        </button>
        <button
          type="button"
          data-title="两端"
          data-alignment="justify"
          class="control-item button null"
          :class="{ 'active': isActive.text_align({level: 'justify'}) }"
          :disabled="isActive.bullet_list()||isActive.ordered_list()||isActive.line_height()"
          @click="commands.text_align({level: 'justify'})"
        >
          <i class="bfi-align-justify" />
        </button>
        <span class="separator-line" />
        <div class="bf-dropdown control-item dropdown headings-dropdown">
          <button type="button" class="dropdown-handler" data-title="标题">
            <span>Title</span>
            <i class="bfi-drop-down" />
          </button>
          <div class="dropdown-content" style="margin-left: 0px;">
            <i class="dropdown-arrow" style="margin-left: 0px;" />
            <div class="dropdown-content-inner">
              <ul class="menu">
                <li class="menu-item">
                  <h1>标题 1</h1>
                </li>
                <li class="menu-item">
                  <h2>标题 2</h2>
                </li>
                <li class="menu-item">
                  <h3>标题 3</h3>
                </li>
                <li class="menu-item">
                  <h4>标题 4</h4>
                </li>
                <li class="menu-item">
                  <h5>标题 5</h5>
                </li>
                <li class="menu-item">
                  <h6>标题 6</h6>
                </li>
                <li class="menu-item active">常规</li>
              </ul>
            </div>
          </div>
        </div>
        <button
          type="button"
          data-title="无序列表"
          class="control-item button"
          :class="{'active': isActive.bullet_list()}"
          :disabled="isActive.text_align()||isActive.line_height()"
          @click="commands.bullet_list"
        >
          <i class="bfi-list" />
        </button>
        <button
          type="button"
          data-title="有序列表"
          class="control-item button"
          :class="{'active': isActive.ordered_list()}"
          :disabled="isActive.text_align()||isActive.line_height()"
          @click="commands.ordered_list"
        >
          <i class="bfi-list-numbered" />
        </button>
        <button
          type="button"
          data-title="引用"
          class="control-item button"
          :class="{'active': isActive.blockquote()}"
          @click="commands.blockquote"
        >
          <i class="bfi-quote" />
        </button>
        <button
          type="button"
          data-title="代码"
          class="control-item button"
          :class="{'active': isActive.code()}"
          @click="commands.code"
        >
          <i class="bfi-code" />
        </button>
        <span class="separator-line" />
        <button type="button" data-title="媒体" class="control-item media button">
          <i class="bfi-media" />
        </button>
        <div class="bf-dropdown control-item dropdown link-editor-dropdown">
          <button type="button" class="dropdown-handler" data-title="链接">
            <span>
              <i class="bfi-link" />
            </span>
          </button>
          <div class="dropdown-content" style="margin-left: 0px;">
            <i class="dropdown-arrow" style="margin-left: 0px;" />
            <div class="dropdown-content-inner">
              <div class="bf-link-editor">
                <div class="input-group">
                  <input type="text" spellcheck="false" placeholder="输入链接地址" value>
                </div>
                <div class="switch-group">
                  <div class="bf-switch undefined" />
                  <label>在新窗口打开</label>
                </div>
                <div class="buttons">
                  <a class="primary button-remove-link pull-left" href="javascript:void(0);">
                    <i class="bfi-close" />
                    <span>移除链接</span>
                  </a>
                  <button type="button" class="primary pull-right">确定</button>
                  <button type="button" class="default pull-right">取消</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button type="button" data-title="清除链接" class="control-item button">
          <i class="bfi-link-off" />
        </button>
        <button type="button" data-title="水平线" class="control-item button" @click="commands.horizontal_rule">
          <i class="bfi-hr" />
        </button>
        <span class="separator-line" />
        <button type="button" data-title="清除内容" class="control-item button">
          <i class="bfi-clear_all" />
        </button>
        <span class="separator-line" />
        <button v-if="fullscreen" type="button" data-title="退出全屏" class="control-item button" @click="changeFullscreen(false)">
          <i class="bfi-fullscreen-exit" />
        </button>
        <button v-if="!fullscreen" type="button" data-title="全屏" class="control-item button" @click="changeFullscreen(true)">
          <i class="bfi-fullscreen" />
        </button>
      </div>
    </editor-menu-bar>
    <div class="bf-content">
      <div class="DraftEditor-root">
        <div class="DraftEditor-editorContainer">
          <editor-content class="public-DraftEditor-content" :editor="editor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Code,
  Italic,
  Link,
  Strike,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Underline,
  HorizontalRule
} from 'tiptap-extensions'
import menuParams from './menuConfig'
import {
  FontSize,
  Bold,
  History,
  TextColor,
  LetterSpacing,
  LineHeight,
  SuperScript,
  SubScript,
  ClearFormat,
  Emoji,
  TextAlign
} from './extensions'
export default {
  components: {
    EditorContent,
    EditorMenuBar
  },
  data() {
    return {
      editor: null,
      dropdownform: {
        textColorIndex: 0
      }, // 下拉菜单
      menuParams,
      fullscreen: false
    }
  },
  mounted() {
    this.editor = new Editor({
      content: '<p>This is just a boring paragraph</p>',
      extensions: [
        new Blockquote(),
        new CodeBlock(),
        new HardBreak(),
        new Heading({ levels: [1, 2, 3] }),
        new BulletList(),
        new OrderedList(),
        new ListItem(),
        new TodoItem(),
        new TodoList(),
        new Bold(),
        new Code(),
        new Italic(),
        new Link(),
        new Strike(),
        new Underline(),
        new History(),
        new Table({
          resizable: true
        }),
        new TableHeader(),
        new TableCell(),
        new TableRow(),
        new FontSize(),
        new LetterSpacing(),
        new LineHeight({
          levels: [1, 1.2]
        }),
        new TextColor(),
        new SuperScript(),
        new SubScript(),
        new ClearFormat(),
        new Emoji(),
        new TextAlign(),
        new HorizontalRule()
      ]
    })
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  methods: {
    handleOpen(name) {
      this.$set(this.dropdownform, name, !this.dropdownform[name])
    },
    handleClose(name) {
      this.$set(this.dropdownform, name, false)
    },
    doExtra(commands, getMarkAttrs) {
      console.log(commands)
    },
    getEditor() {
      console.log(this.editor, this.editor.content, this.editor.getJSON())
    },
    changeFullscreen(flag) {
      console.log(flag, this)
      this.fullscreen = flag
    },
    handleItem(cb) {
      typeof cb === 'function' && cb()
      this.dropdownform = {
        textColorIndex: 0
      }
    },
    handleKeyDown(e) {
      const keyList = [
        'b',
        'd',
        'e',
        'f',
        'g',
        'i',
        'j',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'q',
        'r',
        's',
        'u',
        'y'
      ]
      if (e.ctrlKey || e.shiftKey || e.metaKey || e.altKey) {
        if (~keyList.indexOf(e.key)) {
          e.preventDefault()
        }
      }
      if (e.key === 'Tab') {
        e.preventDefault()
      }
    }
  }
}
</script>

<style src="./braft-editor.css" ></style>
<style lang="less">
.bf-container {
  .ProseMirror {
    outline: none;
  }
  .ivu-dropdown-item {
    margin: 5px;
    line-height: 30px;
    padding: initial;
    clear: initial;
  }
  ul,
  ol {
    margin: 16px 0;
    li {
      margin-left: 1.5em;
    }
  }
  .bf-emojis {
    margin: 0;
    li {
      margin-left: 0;
    }
  }
}
</style>
