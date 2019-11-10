<template>
  <v-container>
    <v-card style="margin-bottom: 20px">
      <v-container>
        <v-subheade>내 프로필</v-subheade>
        <v-form>
          <v-text-field 
            label="nickname"
            required
          />
          <v-btn color="blue" type="submit">수정</v-btn>
        </v-form>
      </v-container>
    </v-card>
    <v-card style="margin-bottom: 20px">
      <v-container>
        <v-subheader>팔로잉</v-subheader>
        <follow-list />
      </v-container>
    </v-card>
    <v-card style="margin-bottom: 20px">
      <v-container>
        <v-subheader>팔로잉</v-subheader>
        <follow-list />
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import FollowList from '~/components/FollowList'
export default {
  components: {
    FollowList
  },
  head() {
    return {
      title: '프로필'
    }
  }
}
</script>

<style>

</style>