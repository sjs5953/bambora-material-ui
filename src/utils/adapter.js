/* eslint-disable func-names */
import { invoke } from './helpers';
import {
  DISABLED,
  IN_FOCUS,
  HAS_ERROR,
  FOCUSED,
  CARD,
  CVV,
  EXP,
  PAY,
} from './constants';

export const checkFormFieldComponentReadiness = (state) =>
  typeof state === 'object'
    ? Object.values(state).every((v) => v.isReady)
    : false;

export const getOptionByFieldName = (options = {}) => (
  fieldName,
) => {
  try {
    if (
      typeof options !== 'object' ||
      options === null ||
      !(fieldName in options)
    )
      throw new Error('Unknown option');

    return options[fieldName];
  } catch (e) {
    return {};
  }
};

class FormFieldComponents {
  constructor(f, instance) {
    if (!document)
      throw new Error('Global document required');

    this.id = f;
    this.el = document.getElementById(`${f}-container`);
    this.isReady = false;

    if (!this.el) return;

    this.helper = this.el.querySelector(`#${f}-helper`);
    this.input = this.el.querySelector(`#${f}`);
    this.label = this.el.querySelector('label');
    this.$bambora = instance;
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
    invoke(this.input, 'setAttribute', HAS_ERROR, true);
    invoke(this.label, 'setAttribute', HAS_ERROR, true);
  }

  isComplete() {
    this.hasError = false;
    invoke(this.input, 'removeAttribute', HAS_ERROR);
    invoke(this.label, 'removeAttribute', HAS_ERROR);

    this.hasValue = true;
    this.isReady = true;
    this.setHelper(null);
  }

  isIncomplete() {
    this.isReady = false;
  }

  removeFocusedClassNames() {
    invoke(
      this.input,
      'parentElement.classList.remove',
      FOCUSED,
    );

    if (this.hasValue) return;
    invoke(this.input, 'removeAttribute', IN_FOCUS);
    invoke(this.label, 'removeAttribute', IN_FOCUS);
  }

  setFocusedClassNames() {
    invoke(this.input, 'setAttribute', IN_FOCUS, true);
    invoke(this.label, 'setAttribute', IN_FOCUS, true);
    invoke(
      this.input,
      'parentElement.classList.add',
      FOCUSED,
    );
  }
}

export default (checkout, options) => {
  const opts = getOptionByFieldName(options);

  const state = [CARD, CVV, EXP].reduce((acc, curr) => {
    const el = checkout.create(curr, {
      ...opts(curr),
      style: {
        base: {
          padding: '27px 12px 10px',
        },
      },
    });

    if (
      typeof window === 'undefined' ||
      !document.getElementById(curr)
    ) {
      el.clear();
      el.unmount();
      return acc;
    }

    el.mount(`#${curr}`);

    return Object.assign(acc, {
      [curr]: new FormFieldComponents(curr, el),
    });
  }, {});

  if (!Object.keys(state).length || !checkout) return;

  const route = (fn) => (args) =>
    fn.call(state[args.field], args);

  // eslint-disable-next-line
  checkout.clearAll = () =>
    Object.values(state).forEach((v) => {
      v.$bambora.clear();
    });

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
