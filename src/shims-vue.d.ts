import Vue from 'vue'
import Message from '@/plugins/Message'
import Http from '@/utils/http'

declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module 'vue/types/vue' {
  interface Vue {
    $http: typeof Http,
    $Message: typeof Message,
    $Confirm: typeof Message
  }
}

declare module 'vuedraggable'
