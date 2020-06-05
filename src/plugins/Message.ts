import Vue from 'vue'
import { Message, MessageBox } from 'element-ui'

let messageInstance: any = null
const resetMessage: any = (options: any) => {
	if (messageInstance) {
		messageInstance.close()
	}
	messageInstance = Message(options)
}

resetMessage.install = () => {
	Vue.prototype.$Message = resetMessage
}
;[ 'error', 'success', 'info', 'warning' ].forEach(type => {
	resetMessage[type] = (options: any) => {
		if (typeof options === 'string') {
			options = {
				message: options,
			}
		}
		options.type = type
		return resetMessage(options)
	}
})

const resetConfirm: any = ({ title, message, callback, center, confirmButtonText, cancelButtonText }
	: { title: string, message: string, callback: any, center: boolean, confirmButtonText: string, cancelButtonText: string }) => {
	MessageBox.confirm(message, title, {
		closeOnPressEscape: false,
		closeOnClickModal: false,
		center: center,
		customClass: 'custom-confirm-box',
		confirmButtonText: confirmButtonText || '确定',
		cancelButtonText: cancelButtonText || '取消',
		callback,
	})
}

resetConfirm.install = () => {
	Vue.prototype.$Confirm = $Confirm
}

export const $Message = resetMessage
export const $Confirm = resetConfirm

export default resetMessage