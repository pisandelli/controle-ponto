<script lang='ts' setup>
/**
* Modal to confirm the pause.
* @name 'PausaModal'
* @version 1.0.0
*/
import { Modal } from 'ant-design-vue';
import { h } from 'vue';
const info = () => {
  Modal.info({
    title: 'This is a notification message',
    content: h('div', {}, [
      h('p', 'some messages...some messages...'),
      h('p', 'some messages...some messages...'),
    ]),
    onOk() {
      console.log('ok');
    },
  });
};
</script>
