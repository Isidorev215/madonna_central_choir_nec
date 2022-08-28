<template>
  <div :class="['inline-block', ' items-center relative']" ref="root" style="max-width: 325px" :type="type">
    <div class="select-ui flex justify-between px-3 py-2 bg-white border-gray-400" :class="[has_focus ? 'has-focus' : '']" ref="select_ui">
      <div class="select-selected flex flex-wrap" style="min-width: 220px">
        <div v-for="sel_value in computed_selected_values_as_array" :key="sel_value" @dblclick="$emit('dblclick', sel_value)" class="mr-1 mb-1 rounded-sm selected-values flex bg-gray-100 hover:bg-gray-200 rounded-tl-sm rounded-bl-sm">
          <span class="p-1">
            <slot name="display" :opt="get_option_from_scalar_value(sel_value)">
              {{ get_option_from_scalar_value(sel_value).title || get_option_from_scalar_value(sel_value).name || get_option_from_scalar_value(sel_value) }}
            </slot>
          </span>
          <button @click="hnd_deselect_value(sel_value)" class="close px-1 ml-1 hover:text-white hover:bg-red-500 rounded-tr-sm rounded-br-sm">
            <svg height="14" fill="currentColor" width="14" viewBox="0 0 20 20" aria-hidden="true" focusable="false" class="css-8mmkcg">
              <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
            </svg>
          </button>
        </div>

        <input v-model="search_text" @focus="set_focus(true)" @keydown="hnd_on_keydown" style="padding-left: 2px" ref="input_box" type="text" class="flex-1 rounded-md" />
      </div>
      <div class="buttons flex">
        <button class="text-gray-400 hover:text-gray-600" :class="[has_focus ? 'text-gray-600' : '']" aria-hidden="true" @click="set_focus(true)">
          <svg stroke="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-5 h-5">
            <path fill-rule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path>
          </svg>
        </button>
      </div>
    </div>

    <ul ref="option_menu" class="z-20 absolute z-30 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" :class="[has_focus ? '' : 's-hidden']" role="listbox">
      <li v-for="opt in values" :key="opt.value || opt.title || opt.name || opt" @click="hnd_clicked_option_item(opt)" class="cursor-pointer hover:bg-blue-400 select-none relative py-2 pl-10 pr-4 text-gray-900">
        <span v-if="does_d_match_option(opt)" class="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="w-5 h-5">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
          </svg>
        </span>

        <slot :row="opt">
          {{ opt.title || opt.name || opt.value || opt }}
        </slot>
      </li>
      <li v-if="values.length == 0" :key="opt" @click="hnd_clicked_option_item(opt)" class="cursor-pointer hover:bg-blue-400 select-none relative py-2 pl-10 pr-4 text-gray-400">Empty</li>
    </ul>
  </div>
</template>

<script>
import { computed } from "vue";

export default {
  props: {
    modelValue: null,
    type: {
      type: String,
      default: "button",
    },
    theme: {
      type: String,
      default: "default",
    },
    options: {
      type: Object,
      default: {},
    },
    values: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    let d = useInputModel(props, context.emit, "modelValue");
    let is_d_an_array = computed(() => Array.isArray(d.value));
    // make note of the object key within values:Array props that we want to store wthin "d"
    const value_key = props.key || props.value_key || "value";
    const search_text = ref("");
    const has_focus = ref(false);
    const input_box = ref(null);
    const root = ref(null);
    const select_ui = ref(null);
    const option_menu = ref(null);
    const set_focus = (val) => {
      if (val == true) {
        input_box.value.focus();
        setTimeout(() => {
          let region = option_menu.value.getBoundingClientRect();
          let offset = window.innerHeight - region.bottom;
          if (offset < 30) {
            option_menu.value.style.bottom = select_ui.value.getBoundingClientRect().height + 12 + "px";
          }
          has_focus.value = val;
        }, 120);
      } else {
        has_focus.value = val;
        option_menu.value.style.bottom = "";
      }
    };
    useClickOutside(root, (e) => {
      set_focus(false);
    });
    //extract an options storable value
    let get_option_value_scalar_value = computed(() => {
      return (opt) => {
        let new_value = opt[value_key];
        if (new_value == undefined) {
          new_value = opt["value"] || opt["id"] || opt["name"];
        }
        return new_value;
      };
    });
    //Given a value, get the option it is associated with
    let get_option_from_scalar_value = computed(() => {
      return (val) => {
        var i = 0,
          opt;
        for (i; i < props.values.length; i++) {
          opt = props.values[i];
          if (get_option_value_scalar_value.value(opt) == val) {
            return opt;
          }
        }
        return {
          title: "None",
          value: "none",
          id: null,
          name: null,
        };
      };
    });
    let hnd_clicked_option_item = (opt) => {
      if (opt === undefined || opt === null) return;
      set_focus(false);
      let storage_val = get_option_value_scalar_value.value(opt);
      if (is_d_an_array.value) {
        if (!d.value.includes(storage_val)) {
          d.value.push(storage_val);
        }
      } else {
        d.value = storage_val;
      }
      context.emit("click-option", opt);
    };
    const does_d_match_option = computed(() => {
      return (opt) => {
        let opt_val = get_option_value_scalar_value.value(opt);
        if (is_d_an_array.value) {
          return d.value.includes(opt_val);
        } else {
          return d.value == opt_val;
        }
      };
    });
    let hnd_on_keydown = (e) => {
      let key_code = e.keyCode;
      const BACK = 8,
        DEL = 46;
      if (search_text.value.length == 0 && (key_code == BACK || key_code == DEL)) {
        if (is_d_an_array) d.value = [];
        else {
          d.value = "";
        }
      }
    };
    let computed_selected_values_as_array = computed(() => {
      if (is_d_an_array.value) {
        return d.value;
      } else {
        return [d.value];
      }
    });
    let hnd_deselect_value = (val) => {
      if (is_d_an_array.value) {
        let index = d.value.indexOf(val);
        if (index == -1) return;
        d.value.splice(index, 1);
      } else {
        d.value = "";
      }
      context.emit("remove-value", val);
    };
    return {
      d,
      is_d_an_array,
      search_text,
      has_focus,
      set_focus,
      root,
      input_box,
      select_ui,
      option_menu,
      hnd_clicked_option_item,
      hnd_on_keydown,
      get_option_value_scalar_value,
      does_d_match_option,
      get_option_from_scalar_value,
      computed_selected_values_as_array,
      hnd_deselect_value,
    };
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
.select-ui {
  border-radius: 4px;
  border-style: solid;
  border-width: 1px;
}

.select-ui input:active,
.select-ui input:focus,
.select-ui input:focus-visible,
.select-ui input {
  box-shadow: none;
  border: none;
  outline: none;
}

.select-ui.has-focus {
  box-shadow: 0px 0px 0px 1px rgb(37 99 235 / 80%);
}
</style>
