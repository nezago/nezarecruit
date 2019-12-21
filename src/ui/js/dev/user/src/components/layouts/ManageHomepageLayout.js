/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { Component } from 'react';
import {
  FaUnderline,
  FaItalic,
  FaBold,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaSuperscript,
  FaSubscript,
  FaStrikethrough,
  FaListOl,
  FaListUl,
  FaLink,
  FaUnlink,
  FaUndo,
  FaRedo,
  FaBackspace,
  FaCopy,
  FaCut,
  FaTypo3,
} from 'react-icons/fa';
import {
  handleTypingEmailInIframe,
  displayFontSizesInManageHomepage,
  displayFontFamiliesInManageHomepage,
  handleTypingWhyNezarecuritInIframe,
  displayFontFamilie2InManageHomepage,
  displayFontSize2InManageHomepage,
  handleSaveAmanage,
} from '../../helpers/functions/handlers';

export class ManageHomepageLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const necessaryFields = {
      whyNezarecruitIframe: document.getElementById('whyNezarecruitIframe'),
      emailMsgIframe: document.getElementById('emailMsgIframe'),
      saveManageErrorDiv: document.getElementById('save-manage-error-div'),
      saveManageResultDiv: document.getElementById('save-manage-result-div'),
      saveManageResultContainer: document.getElementById('save-manage-result-container'),
      spinnerBorder: document.getElementById('spinner-border'),
      spanSendMsg: document.getElementById('span-send-msg'),
      spinnerGrow: document.querySelectorAll('span#spinner-grow'),
    };
    this.setState({ necessaryFields });
    displayFontFamiliesInManageHomepage(document.getElementById('fontChanger'));
    displayFontSizesInManageHomepage(document.getElementById('fontSize'));
    displayFontFamilie2InManageHomepage(document.getElementById('fontChanger2'));
    displayFontSize2InManageHomepage(document.getElementById('fontSize2'));
    handleTypingEmailInIframe();
    handleTypingWhyNezarecuritInIframe();
  }

  render() {
    return (
      <div>

        {/** MANAGE EDITOR PORTION */}
        <div
          className="mt-5 width-80 color-rigth-grey-transparent p-2 mb-5"
        >

          <div>
            <label htmlFor="emailMsgIframe" className="form-group form-row">
              <div
                id="textEditor"
                className="col-md-12"
              >
                <div className="text-center text-22">
                  <span>
                    What is NezaRecruit?
                  </span>
                </div>
                <div id="theRibbon">
                  <button type="button" id="boldBtn" title="Bold"><FaBold /></button>
                  <button type="button" id="italicBtn" title="Italic"><FaItalic /></button>
                  <button type="button" id="underlineBtn" title="Underline"><FaUnderline /></button>
                  <button type="button" id="justifyLeftBtn" title="Align left"><FaAlignLeft /></button>
                  <button type="button" id="justifyCenterBtn" title="Align Center"><FaAlignCenter /></button>
                  <button type="button" id="justifyRightBtn" title="Align Right"><FaAlignRight /></button>
                  <button type="button" id="justifyFullBtn" title="Align Justify"><FaAlignJustify /></button>
                  <button type="button" id="supBtn" title="Superscript">
                    <FaSuperscript />
                  </button>
                  <button type="button" id="subBtn" title="Subscript">
                    <FaSubscript />
                  </button>
                  <button type="button" id="strikeBtn" title="Strikethrough"><FaStrikethrough /></button>
                  <button type="button" id="orderedListBtn" title="Numbered list"><FaListOl /></button>
                  <button type="button" id="unorderedListBtn" title="Bulleted list"><FaListUl /></button>
                  <input type="color" id="fontcolorBtn" title="Change Font color" />
                  <input type="color" id="highlightBtn" title="Highlight Text" />
                  <select id="fontChanger" />
                  <select id="fontSize" />
                  <button type="button" id="linkBtn" title="Create a link"><FaLink /></button>
                  <button type="button" id="unlinkBtn" title="Remove a link"><FaUnlink /></button>
                  <button type="button" id="undoBtn" title="Undo the previous action"><FaUndo /></button>
                  <button type="button" id="redoBtn" title="Redo"><FaRedo /></button>
                  <button type="button" id="backspaceBtn" title="Delete previous character"><FaBackspace /></button>
                  <button type="button" id="copyBtn" title="Copy"><FaCopy /></button>
                  <button type="button" id="cutBtn" title="Cut"><FaCut /></button>
                  <button type="button" id="selectAllBtn" title="Select all"><FaTypo3 /></button>
                </div>
                <div id="richTextArea">
                  <iframe
                    title="what-nezarecruit-iframe"
                    id="emailMsgIframe"
                    name="emailMsgIframe"
                    frameBorder="0"
                  />
                </div>

                {/** WRITE A WHY HERE */}

                <div className="text-center text-22 mt-3">
                  <span>
                    Why does NezaRecruit matters to you?
                  </span>
                </div>

                <div id="theRibbon">
                  <button type="button" id="boldBtn2" title="Bold"><FaBold /></button>
                  <button type="button" id="italicBtn2" title="Italic"><FaItalic /></button>
                  <button type="button" id="underlineBtn2" title="Underline"><FaUnderline /></button>
                  <button type="button" id="justifyLeftBtn2" title="Align left"><FaAlignLeft /></button>
                  <button type="button" id="justifyCenterBtn2" title="Align Center"><FaAlignCenter /></button>
                  <button type="button" id="justifyRightBtn2" title="Align Right"><FaAlignRight /></button>
                  <button type="button" id="justifyFullBtn2" title="Align Justify"><FaAlignJustify /></button>
                  <button type="button" id="supBtn2" title="Superscript">
                    <FaSuperscript />
                  </button>
                  <button type="button" id="subBtn2" title="Subscript">
                    <FaSubscript />
                  </button>
                  <button type="button" id="strikeBtn2" title="Strikethrough"><FaStrikethrough /></button>
                  <button type="button" id="orderedListBtn2" title="Numbered list"><FaListOl /></button>
                  <button type="button" id="unorderedListBtn2" title="Bulleted list"><FaListUl /></button>
                  <input type="color" id="fontcolorBtn2" title="Change Font color" />
                  <input type="color" id="highlightBtn2" title="Highlight Text" />
                  <select id="fontChanger2" />
                  <select id="fontSize2" />
                  <button type="button" id="linkBtn2" title="Create a link"><FaLink /></button>
                  <button type="button" id="unlinkBtn2" title="Remove a link"><FaUnlink /></button>
                  <button type="button" id="undoBtn2" title="Undo the previous action"><FaUndo /></button>
                  <button type="button" id="redoBtn2" title="Redo"><FaRedo /></button>
                  <button type="button" id="backspaceBtn2" title="Delete previous character"><FaBackspace /></button>
                  <button type="button" id="copyBtn2" title="Copy"><FaCopy /></button>
                  <button type="button" id="cutBtn2" title="Cut"><FaCut /></button>
                  <button type="button" id="selectAllBtn2" title="Select all"><FaTypo3 /></button>
                </div>
                <div id="richTextArea2">
                  <iframe
                    title="why-nezarecruit-iframe"
                    id="whyNezarecruitIframe"
                    name="whyNezarecruitIframe"
                    frameBorder="0"
                  />
                </div>

                {/** SAVING BTN */}
                <div className="mb-5">
                  <button
                    type="button"
                    className="btn btn-block btn-sm btn-success"
                    id="send-msg-btn"
                    onClick={() => handleSaveAmanage(this.state.necessaryFields)}
                  >
                    <span id="spinner-border" />
                    <span id="span-send-msg">Save a Manage</span>
                    <span id="spinner-grow" />
                    <span id="spinner-grow" />
                    <span id="spinner-grow" />
                  </button>
                  {/** save a manage error */}
                  <div
                    id="save-manage-error-div"
                    className="text-danger text-center text-17"
                  />
                  { /** save a manage success result */}
                  <div
                    id="save-manage-result-div"
                    className="mt-5 heigth-80 overflow-auto width-80 color-grey-transparent p-2 hidden-div"
                  >
                    <div
                      className="padding-15 width-40 color-dark-purple text-17 text-center"
                      id="save-manage-result-container"
                    />
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageHomepageLayout;
