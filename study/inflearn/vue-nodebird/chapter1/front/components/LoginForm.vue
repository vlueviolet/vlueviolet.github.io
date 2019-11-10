<template>
  <v-container>
     <v-card>
       <v-form @submit.prevent="" v-model="valid" >
         <v-container>
          <v-text-field
            label="email"
            type="email"
            v-model="email"
            :rules="emailRules"
            required
          />
          <v-text-field
            label="password"  
            type="password"
            v-model="password"
            :rules="passwordRules"
            required
          />
          <v-btn color="green" type="submit">로그인</v-btn>
          <v-btn nuxt to="/signup">회원가입</v-btn>
         </v-container>
       </v-form>
     </v-card>
   </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailRules: [
        v => !!v || '이메일은 필수입니다.',
        v => /.+@.+/.test(v) || '이메일이 유효하지 않습니다.'
      ],
      passwordRules: [
        v => !!v || '비밀번호는 필수입니다.',
      ],
    }
  }
}
</script>

<style>

</style>