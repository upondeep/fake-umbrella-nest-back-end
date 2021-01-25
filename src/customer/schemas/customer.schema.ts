import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Customer extends Document {
    @Prop()
    name: string;

    @Prop()
    person_of_contact: string;

    @Prop()
    telephone_number: string;

    @Prop()
    location: string;

    @Prop()
    number_of_employees: number;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);

CustomerSchema.virtual('customer_id').get(function () {
    return this._id;
});

CustomerSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id; delete ret.id; }
});