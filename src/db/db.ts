async function updateData(messages: string[], newMessage: string, health: number, inventory: string[], equipped_weapon: string) {
    await fetch("http://localhost:3000/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        story: [...messages, newMessage],
        player: {
          health: health,
          inventory: inventory,
          equipped_weapon: equipped_weapon
        }
      })
    });
}
async function removeData() {
   try {
     await fetch("http://localhost:3000/me", {
       method: "PUT",
       headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        story: "",
        player: {
          health: 100,
          inventory: [],
          equipped_weapon: ""
        }
      })
    });
  } catch (error) {
    console.error(error);
  }
}

  async function getData() {
    const response = await fetch("http://localhost:3000/me");
    const data = await response.json();
    return data;
  }

export { updateData, removeData, getData };