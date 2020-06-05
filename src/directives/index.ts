import Vue from 'vue'

const sClick = Vue.directive('sClick', {
    inserted(el: any, binding) {
        el.addEventListener('click', () => {
            if (!el.disabled) {
                el.disabled = true
                let timer = setTimeout(() => {
                    el.disabled = false
                    clearTimeout(timer)
                }, binding.value || 1500)
            }
        })
    }
})

export default sClick