// PPL 2023 HW4 Part2

// Q 2.1 

// Specify the return type.
export const delayedSum = (a: number, b: number, delay: number) => {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, delay);
  });
};


export const testDelayedSum = (a: number, b: number, delay: number) => {
  const beginning = Date.now();
  let end;
  return delayedSum(a, b, delay).then((sum) => {
    end = Date.now();
    const elapsedTime = end - beginning;
    return elapsedTime >= delay
  });
};

// Q 2.2

// Values returned by API calls.
export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

// When invoking fetchData(postsUrl) you obtain an Array Post[]
// To obtain an array of posts
export const postsUrl = 'https://jsonplaceholder.typicode.com/posts'; 

// Append the desired post id.
export const postUrl = 'https://jsonplaceholder.typicode.com/posts/1'; 

// When invoking fetchData(invalidUrl) you obtain an error
export const invalidUrl = 'https://jsonplaceholder.typicode.com/invalid';

// Depending on the url - fetchData can return either an array of Post[] or a single Post.
// Specify the return type without using any.

export const fetchData = async (url: string) => {
  try 
  {
    const response = await fetch(url);
    if (!response.ok) {throw new Error();}
    const data = (await response.json()) as Post | Post[];
    return data;
  }
  catch (error) {throw new Error();}
}

export const testFetchData = async (url: string) => {
  try {return (await fetchData(url));}
  catch (error) {return false}
}

// Q 2.3

// Specify the return type.
export const fetchMultipleUrls = async (urls: string[]) => {
  try 
  {
    const promises = urls.map((url) => fetchData(url));
    const responses = await Promise.all(promises);
    return responses as Post[];
  } 
  catch (error) {throw new Error();}
}

export const testFetchMultipleUrls = async (urls: string[]) => {
  try {return (await fetchMultipleUrls(urls));}
  catch (error) {return false;}
};
