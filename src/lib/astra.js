import { DataAPIClient } from '@datastax/astra-db-ts';

// Initialize the Astra DB client
const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN);

// Get the database instance
const db = client.db(process.env.ASTRA_DB_API_ENDPOINT);

// Get the registrations collection
export const getRegistrationsCollection = async () => {
  try {
    // First, try to create the collection (this will succeed if it doesn't exist)
    try {
      await db.createCollection('registrations');
      console.log('Created registrations collection');
    } catch (error) {
      // If collection already exists, that's fine - ignore the error
      if (!error.message.includes('already exists')) {
        console.error('Error creating collection:', error);
      }
    }
    
    // Now return the collection
    return db.collection('registrations');
  } catch (error) {
    console.error('Error getting/creating collection:', error);
    throw error;
  }
};

// Create a new registration
export async function createRegistration(registrationData) {
  try {
    const collection = await getRegistrationsCollection();
    
    // Add timestamp to the registration data
    const registrationWithTimestamp = {
      ...registrationData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await collection.insertOne(registrationWithTimestamp);
    return { success: true, id: result.insertedId };
  } catch (error) {
    console.error('Error creating registration:', error);
    throw new Error('Failed to create registration');
  }
}

// Get all registrations (for admin purposes)
export async function getAllRegistrations() {
  try {
    const collection = await getRegistrationsCollection();
    const cursor = collection.find({});
    const registrations = await cursor.toArray();
    return registrations;
  } catch (error) {
    console.error('Error fetching registrations:', error);
    throw new Error('Failed to fetch registrations');
  }
}

// Get registration by email
export async function getRegistrationByEmail(email) {
  try {
    const collection = await getRegistrationsCollection();
    const registration = await collection.findOne({ email });
    return registration;
  } catch (error) {
    console.error('Error fetching registration by email:', error);
    throw new Error('Failed to fetch registration');
  }
}

// Update registration
export async function updateRegistration(id, updateData) {
  try {
    const collection = await getRegistrationsCollection();
    
    const updateWithTimestamp = {
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    const result = await collection.updateOne(
      { _id: id },
      { $set: updateWithTimestamp }
    );
    
    return { success: result.modifiedCount > 0 };
  } catch (error) {
    console.error('Error updating registration:', error);
    throw new Error('Failed to update registration');
  }
}

// Delete registration
export async function deleteRegistration(id) {
  try {
    const collection = await getRegistrationsCollection();
    const result = await collection.deleteOne({ _id: id });
    return { success: result.deletedCount > 0 };
  } catch (error) {
    console.error('Error deleting registration:', error);
    throw new Error('Failed to delete registration');
  }
}

export default db;