<template>
  <v-container>
    <v-card>
      <v-container>
        <v-subheader>회원가입</v-subheader>
        <v-form>
          <v-text-field
            label="email"
            type="email"
            required
          />
          <v-text-field
            label="password"
            type="password"
            required
          />
          <v-text-field
            label="password-check"
            type="password"
            required
          />
          <v-text-field
            label="nickname"
            type="text"
            required
          />
          <v-checkbox
            label="agree"
            required
          />
          <v-btn color="green" type="submit">가입하기</v-btn>
        </v-form>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
export default {
}
</script>

<style>

</style>