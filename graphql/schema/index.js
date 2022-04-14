const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Ticket {
      _id: ID!
      flight: String!
      depTime: String!
      arrTime: String!
      from: String!
      to: String!
      gate: String!
      duration: Float!
      classType: String!
      passenger: String!
      seat: String!
      fullName: String!
      email: String!
      phoneNumber: String!
      payment: String!
    }

    type PaymentResponse {
      id: ID!
      success: Boolean!
    }

    type RefundResponse {
      message: String!
      success: Boolean!
    }

    input TicketInput {
      flight: String!
      depTime: String!
      arrTime: String!
      from: String!
      to: String!
      gate: String!
      duration: Float!
      classType: String!
      passenger: String!
      seat: String!
      fullName: String!
      email: String!
      phoneNumber: String!
      payment: String!
    }

    type RootQuery {
      tickets: [Ticket!]!
    }

    type RootMutation {
      addTicket(ticketInput: TicketInput!): String
      updateTicket(ticketId: ID!, payment: String!): [Ticket!]!
      deleteTicket(ticketId: ID!): [Ticket!]!
      createPayment(paymentId: ID!, amount: Float!, flight: String!): PaymentResponse!
      refundPayment(paymentIntentId: ID!, amount: Float!): RefundResponse!
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `);
