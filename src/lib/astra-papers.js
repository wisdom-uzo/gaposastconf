import { DataAPIClient } from '@datastax/astra-db-ts';

// Initialize the Astra DB client
const client = new DataAPIClient(process.env.ASTRA_DB_APPLICATION_TOKEN);

// Get the database instance
const db = client.db(process.env.ASTRA_DB_API_ENDPOINT);

// Get the paper submissions collection
export const getPaperSubmissionsCollection = async () => {
  try {
    // First, try to create the collection (this will succeed if it doesn't exist)
    try {
      await db.createCollection('paper_submissions');
      console.log('Created paper_submissions collection');
    } catch (error) {
      // If collection already exists, that's fine - ignore the error
      if (!error.message.includes('already exists')) {
        console.error('Error creating collection:', error);
      }
    }
    
    // Now return the collection
    return db.collection('paper_submissions');
  } catch (error) {
    console.error('Error getting/creating collection:', error);
    throw error;
  }
};

// Create a new paper submission
export async function createPaperSubmission(submissionData) {
  try {
    const collection = await getPaperSubmissionsCollection();
    
    // Add timestamp to the submission data
    const submissionWithTimestamp = {
      ...submissionData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'submitted', // Initial status
    };

    const result = await collection.insertOne(submissionWithTimestamp);
    return { success: true, id: result.insertedId };
  } catch (error) {
    console.error('Error creating paper submission:', error);
    throw new Error('Failed to create paper submission');
  }
}

// Get all paper submissions (for admin purposes)
export async function getAllPaperSubmissions() {
  try {
    const collection = await getPaperSubmissionsCollection();
    const submissions = await collection.find({}).toArray();
    return submissions;
  } catch (error) {
    console.error('Error fetching paper submissions:', error);
    throw new Error('Failed to fetch paper submissions');
  }
}

// Get paper submission by email
export async function getPaperSubmissionByEmail(email) {
  try {
    const collection = await getPaperSubmissionsCollection();
    const submission = await collection.findOne({ authorEmail: email });
    return submission;
  } catch (error) {
    console.error('Error fetching paper submission by email:', error);
    throw new Error('Failed to fetch paper submission');
  }
}

// Update paper submission by ID
export async function updatePaperSubmission(id, updateData) {
  try {
    const collection = await getPaperSubmissionsCollection();
    
    // Add updated timestamp
    const updateWithTimestamp = {
      ...updateData,
      updatedAt: new Date().toISOString(),
    };

    const result = await collection.updateOne(
      { _id: id },
      { $set: updateWithTimestamp }
    );
    
    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Error updating paper submission:', error);
    throw new Error('Failed to update paper submission');
  }
}

// Delete paper submission by ID
export async function deletePaperSubmission(id) {
  try {
    const collection = await getPaperSubmissionsCollection();
    const result = await collection.deleteOne({ _id: id });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting paper submission:', error);
    throw new Error('Failed to delete paper submission');
  }
}