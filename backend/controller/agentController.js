

import bcrypt from 'bcrypt';

export const createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const existing = await Agent.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Agent with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const agent = new Agent({
      name,
      email,
      mobile,
      password: hashedPassword
    });

    const saved = await agent.save();
    res.status(201).json({ success: true, agent: saved });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all agents
export const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().sort({ createdAt: -1 });
    res.json({ success: true, agents });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
