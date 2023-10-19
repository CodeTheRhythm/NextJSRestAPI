import Mongo from '@/app/libs/mongodb';
import Todo from '@/app/models/todoModel';

async function find() {
  let data: any;
  await Mongo.connect(async () => {
    data = await Todo.find();
  });
  return data;
}

async function addNew(data: any) {
  await Mongo.connect(async () => {
    await Todo.create(data);
  });
}

async function findById(id: string) {
  await Mongo.connect();
  return await Todo.findOne({ _id: id });
}

async function update(id: string, data: any) {
  await Mongo.connect();
  await Todo.findByIdAndUpdate(id, data);
}

async function remove(id: string) {
  await Mongo.connect();
  await Todo.findByIdAndDelete(id);
}

export default { find, addNew, findById, update, remove }