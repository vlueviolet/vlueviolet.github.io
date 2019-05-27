<template>
  <Modal class="modal-card">
    <div slot="header" class="modal-card-header">
      <div class="modal-card-header-title">
        <input class="form-control" type="text" :value="card.title" 
          :readonly="!toggleTitle" @click="toggleTitle=true" @blur="onBlurTitle"
          ref="inputTitle">
      </div>
      <a class="modal-close-btn" href="" @click.prevent="onClose">&times;</a>
    </div>
    <div slot="body">
      <h3>Description</h3>
      <textarea  class="form-control" cols="30" rows="3" placeholder="Add a more detailed description..."
        :readonly="!toggleDesc" @click="toggleDesc=true" @blur="onBlurDesc"
        ref="inputDesc"
        v-model="card.description"></textarea>
    </div>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
import Modal from './Modal.vue'
import {mapActions, mapState} from 'vuex'

export default {
  components: {
    Modal
  },
  data() {
    return {
      // mapState 추가로 불필요
      // cid: 0,
      // loading: false
      toggleTitle: false,
      toggleDesc: false
    }
  },
  computed: {
    ...mapState({
      card: 'card',
      board: 'board'
    })
  },
  created() {
    this.fetchCard()
  },
  // FETCH_CARD actions으로 대체
  // watch: {
  //   '$route': {
  //     handler: 'fetchData',
  //     immediate: true
  //   }
  // },
  methods: {
    // 호출 예시여서 주석처리
    // fetchData() {
    //   this.loading = true
    //   setTimeout(() => {
    //     this.cid = this.$route.params.cid
    //     this.loading = false
    //   }, 500)
    // }
    ...mapActions ([
      'FETCH_CARD',
      'UPDATE_CARD'
    ]),
    onClose() {
      this.$router.push(`/b/${this.board.id}`)
    },
    fetchCard() {
      const id = this.$route.params.cid
      this.FETCH_CARD({id})
      console.log(id)
    },
    onBlurTitle() {
      this.toggleTitle = false
      const title = this.$refs.inputTitle.value.trim()
      if (!title) return
      this.UPDATE_CARD({id: this.card.id, title})
        .then(() => this.fetchCard())
    },
    onBlurDesc() {
      this.toggleDest = false
      const description = this.$refs.inputDesc.value.trim()
      if (!description) return
      this.UPDATE_CARD({id: this.card.id, description})
        .then(() => this.fetchCard())
    }
  }
}
</script>

<style>
.modal-card .modal-container {
  min-width: 300px;
  max-width: 800px;
  width: 60%;
}
.modal-card-header-title {
  padding-right: 30px;  
}
.modal-close-btn {
  position: absolute;
  top: 0px;
  right: 0px;
  font-size: 24px;
  text-decoration: none;
}
.modal-card-header {
  position: relative;
}
</style>
