/**
 * ===============================================
 * SETUP DE COMPONENTES VUE PARA PRUEBAS
 * Proyecto: Numeris Astral - Frontend
 * ===============================================
 *
 * Este archivo proporciona stubs de componentes de Quasar
 * para usar en pruebas de componentes de Vue.
 */

import { h } from 'vue';

// Stubs de componentes de Quasar
export const quasarStubs = {
  QIcon: {
    name: 'QIcon',
    render() {
      return h('div', { class: 'q-icon' });
    }
  },
  QInput: {
    name: 'QInput',
    props: ['modelValue', 'type', 'outlined', 'dark', 'color', 'rules'],
    emits: ['update:modelValue'],
    render() {
      return h('input', {
        type: this.type,
        value: this.modelValue,
        onInput: (e) => this.$emit('update:modelValue', e.target.value)
      });
    }
  },
  QForm: {
    name: 'QForm',
    render() {
      return h('div', this.$slots.default ? this.$slots.default() : []);
    }
  },
  QCard: {
    name: 'QCard',
    render() {
      return h('div', { class: 'q-card' }, this.$slots.default ? this.$slots.default() : []);
    }
  },
  QImg: {
    name: 'QImg',
    render() {
      return h('div', { class: 'q-img' });
    }
  },
  QAvatar: {
    name: 'QAvatar',
    render() {
      return h('div', { class: 'q-avatar' }, this.$slots.default ? this.$slots.default() : []);
    }
  }
};

export const routerStubs = {
  RouterLink: {
    name: 'RouterLink',
    render() {
      return h('a', this.$slots.default ? this.$slots.default() : []);
    }
  }
};
