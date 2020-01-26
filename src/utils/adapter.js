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

  static enableSubmit() {
    const e = document.getElementById(PAY);
    invoke(e, 'removeAttribute', 'disabled');
    invoke(e, 'classList.remove', DISABLED);
  }

  static disableSubmit() {
    const e = document.getElementById(PAY);
    invoke(e, 'setAttribute', 'disabled', true);
    invoke(e, 'classList.add', DISABLED);
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

  setError(msg) {
    this.hasError = true;
    this.setHelper(msg);
  }

  isComplete() {
    this.hasError = false;
    this.hasValue = true;
    this.isReady = true;
    this.setHelper(null);
  }

  isIncomplete() {
    this.isReady = false;
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
    checkout
      .create(curr, {
        style: {
          base: {
            padding: '27px 12px 10px',
          },
        },
      })
      .mount(`#${curr}`);
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
      FormFieldComponents.disableSubmit();
    }),
  );

  checkout.on(
    'error',
    route(function(o) {
      this.setError(o.message);
    }),
  );

  checkout.on(
    'complete',
    route(function(v) {
      if (v.complete) {
        this.isComplete();
        if (checkFormFieldComponentReadiness(state))
          FormFieldComponents.enableSubmit();
      } else {
        this.isIncomplete();
        FormFieldComponents.disableSubmit();
      }
    }),
  );
};
