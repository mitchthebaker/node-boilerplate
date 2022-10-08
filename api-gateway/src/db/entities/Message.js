const { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } = require("typeorm");

@Entity("messages")
class Message {
  @PrimaryGeneratedColumn("uuid")
  id;

  @Column()
  message;

  @CreateDateColumn()
  createdAt;
}

module.exports = Message;