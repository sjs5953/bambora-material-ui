/* eslint-disable func-names */
import { invoke } from './helpers';
import {
  DISABLED,
  FOCUSED,
  SHRINK,
  CARD,
  CVV,
  EXP,
  PAY,
} from './constants';

export const checkFormFieldComponentReadiness = (state) =>
  typeof state === 'object'
    ? Object.values(state).every((v) => v.isReady)
    : false;

export const controlSubmitButtonState = (setSubmit) => {
  const e = document.getElementById(PAY);
  invoke(
    e,
    setSubmit ? 'removeAttribute' : 'setAttribute',
    'disabled',
  );
  invoke(
    e,
    `classList.${setSubmit ? 'remove' : 'add'}`,
    DISABLED,
  );
};

class FormFieldComponents {
  constructor(f) {
    if (!document)
      throw new Error('Global document required');

    this.id = f;
    this.el = document.getElementById(`${f}-container`);
    this.isReady = false;

    if (!this.el) return;

    this.helper = this.el.querySelector(`#${f}-helper`);
    this.input = this.el.querySelector(`#${f}`);
    this.label = this.el.querySelector('label');
  }

  setHelper(msg) {
    const e = this.helper;
    if (!e) return;
    if (msg) {
      e.setAttribute('style', null);
      e.innerHTML = msg;
    } else {
      e.setAttribute('style', 'display: none;');
      e.innerHTML = '';
    }
  }

  setValue(bool) {
    this.hasValue = bool;
  }

  isComplete() {
    this.hasError = false;
    this.hasValue = true;
    this.isReady = true;
    this.setHelper(null);
  }

  isIncomplete(msg) {
    this.hasError = true;
    this.isReady = false;
    this.setHelper(msg);
  }

  removeFocusedClassNames() {
    if (this.hasValue) return;
    invoke(this.input, 'classList.remove', FOCUSED);
    invoke(this.label, 'classList.remove', SHRINK);
  }

  setFocusedClassNames() {
    invoke(this.input, 'classList.add', FOCUSED);
    invoke(this.label, 'classList.add', SHRINK);
  }
}

export default (checkout) => {
  const state = [CARD, CVV, EXP].reduce((acc, curr) => {
    checkout.create(curr).mount(`#${curr}`);
    return Object.assign(acc, {
      [curr]: new FormFieldComponents(curr),
    });
  }, {});

  const route = (fn) => (args) =>
    fn.call(state[args.field], args);

  checkout.on(
    'focus',
    route(function() {
      this.setFocusedClassNames();
    }),
  );

  checkout.on(
    'blur',
    route(function() {
      this.removeFocusedClassNames();
    }),
  );

  checkout.on(
    'empty',
    route(function(v) {
      this.setValue(!v.empty);
    }),
  );

  checkout.on(
    'error',
    route(function(o) {
      this.isIncomplete(o.message);
    }),
  );

  checkout.on(
    'complete',
    route(function() {
      this.isComplete();
      controlSubmitButtonState(
        checkFormFieldComponentReadiness(state),
      );
    }),
  );
};
