export default function ({ app, store, redirect }) {
  if (!app.$auth.user.is_admin) {
    return redirect('/admin/sign-in');
  }
}
