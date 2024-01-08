import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  title: String,
  price: Number,
  imageUrl: String,
  quantity: {
    type: Number,
    default: 1,
  },
});
export default mongoose.model('CartItem', cartSchema);


