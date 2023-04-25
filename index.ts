console.log("hai");
type MessageContent = string | number | boolean;

type Message<T extends MessageContent> = {
  id: string;
  senderId: string;
  recipientId: string;
  content: T;
  timestamp: Date;
};

function generateId(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const id = Math.random().toString(36).substring(7);
    const message = originalMethod.apply(this, args);
    message.id = id;
    return message;
  };
}

namespace MessageTypes {
  export type Message<T extends MessageContent> = {
    id: string;
    senderId: string;
    recipientId: string;
    content: T;
    timestamp: Date;
  };

  function generateId(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // implementation
  }

  export type Optional<T> = {
    [P in keyof T]?: T[P];
  };
}

class MessageService {
  messages: Message<MessageContent>[] = [];

  @generateId
  createMessage(senderId: string, recipientId: string, content: MessageContent): Message<MessageContent> {
    const message: Message<MessageContent> = {
      id: '',
      senderId,
      recipientId,
      content,
      timestamp: new Date(),
    };
    this.messages.push(message);
    return message;
  }

  getMessages(): Message<MessageContent>[] {
    return this.messages;
  }

  deleteMessage(id: string): void {
    this.messages = this.messages.filter((message) => message.id !== id);
  }
}

const messageService = new MessageService();

const message1 = messageService.createMessage('sender1', 'recipient1', 'Hello!');
console.log(message1);

const message2 = messageService.createMessage('sender2', 'recipient2', 123);
console.log(message2);

const message3 = messageService.createMessage('sender3', 'recipient3', true);
console.log(message3);

const messages = messageService.getMessages();
console.log(messages);

messageService.deleteMessage(message1.id);

const remainingMessages = messageService.getMessages();
console.log(remainingMessages);


// In this implementation, we first define the MessageContent type alias that represents the content of a message. We then define the Message mapped type that represents a message object with a generated ID and all other properties.

// We define a custom decorator called generateId that generates a random ID for a message object. This decorator is applied to the createMessage method of the MessageService class.

// We also define a namespace called MessageTypes that includes the Message type alias, generateId decorator, and an Optional utility type that converts all properties of a type to optional.

// The MessageService class has a property called messages that is an array of Message objects. It also has a createMessage method that takes a sender ID, recipient ID, and message content, and returns a new Message object with a generated ID and current timestamp.

// The getMessages method returns all messages in the messages array, and the deleteMessage method deletes a message from the messages array based on the ID.

// Finally, we test the MessageService class by creating a new instance and calling the createMessage, getMessages, and deleteMessage methods.