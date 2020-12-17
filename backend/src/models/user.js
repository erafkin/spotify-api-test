import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  provider: String,
  spotifyId: String,
  username: String,
  displayName: String,
  profileUrl: String,
  photos: Array,
  country: String,
  followers: Number,
}, { collection: 'user' });

UserSchema.set('toJSON', {
  virtuals: true,
});

const User = mongoose.model('User', UserSchema);

export default User;
