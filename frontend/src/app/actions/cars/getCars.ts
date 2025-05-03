"use server";


export async function getCars() {
  try {
    
    const res = await fetch("https://api.example.com/cars", {
      next: {tags: ["cars"], revalidate: 3600,},
      cache: "force-cache",   
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cars. Status code: " + res.status);
    }
    
    const cars = await res.json();
    return cars;

  } catch (error) {
    console.error("Error in getCars:", error);
    throw new Error("Something went wrong while fetching cars.");
  }
}

