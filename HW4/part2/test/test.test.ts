import { describe, expect, test } from '@jest/globals'
import {
    delayedSum, testDelayedSum, Post, postsUrl, postUrl, invalidUrl, fetchData, testFetchData, fetchMultipleUrls, testFetchMultipleUrls
} from '../src/part2';

describe('Assignment 4 Part 2', () => {
    describe('Q2.1 delayedSum (6 points)', () => {
        test('delayedSum returns the sum', async () => {

            expect(await delayedSum(1, 2, 3000).then((result) => {return result;})).toBe(3);
        })
        test('delayedSum waits at least the specified delay', async () => {

            expect(await testDelayedSum(1, 2, 3000)).toBe(true);
        })
    })

    describe('Q2.2 fetchData (12 points)', () => {
        test('successful call to fetchData with array result', async () => {

            const posts = await testFetchData(postsUrl);
            expect(Array.isArray(posts)).toBe(true);

            if (Array.isArray(posts))
            {
                expect(posts.length).toBe(100);

                expect(posts[0].userId).toBe(1);
                expect(posts[0].id).toBe(1);
                expect(posts[0].title).toBe("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
                expect(posts[0].body).toBe("quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto");

                expect(posts[posts.length-1].userId).toBe(10);
                expect(posts[posts.length-1].id).toBe(100);
                expect(posts[posts.length-1].title).toBe("at nam consequatur ea labore ea harum");
                expect(posts[posts.length-1].body).toBe("cupiditate quo est a modi nesciunt soluta\nipsa voluptas error itaque dicta in\nautem qui minus magnam et distinctio eum\naccusamus ratione error aut");
            } 
        })

        test('successful call to fetchData with Post result', async () => {

            const post = await testFetchData(postUrl)
            expect(!Array.isArray(post)).toBe(true);
            expect(typeof post != "boolean").toBe(true);

            if ((!Array.isArray(post)) && (typeof post != "boolean"))
            {
                expect(post.userId).toBe(1);
                expect(post.id).toBe(1);
                expect(post.title).toBe("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
                expect(post.body).toBe("quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto");
            }
        })

        test('failed call to fechData', async () => {
        
            expect(await testFetchData(invalidUrl)).toBe(false);
        })

    })

    describe('Q2.3 fetchMultipleUrls (12 points)', () => {
        test('successful call to fetchMultipleUrls', async () => {

            const apiUrl1 = 'https://jsonplaceholder.typicode.com/posts/1';
            const apiUrl2 = 'https://jsonplaceholder.typicode.com/posts/2';
            const apiUrl3 = 'https://jsonplaceholder.typicode.com/posts/3';
            const urls = [apiUrl1, apiUrl2, apiUrl3]

            const posts = await testFetchMultipleUrls(urls)
            expect(Array.isArray(posts)).toBe(true);

            if (Array.isArray(posts))
            {
                expect(posts[0].userId).toBe(1);
                expect(posts[0].id).toBe(1);
                expect(posts[0].title).toBe("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
                expect(posts[0].body).toBe("quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto");

                expect(posts[1].userId).toBe(1);
                expect(posts[1].id).toBe(2);
                expect(posts[1].title).toBe("qui est esse");
                expect(posts[1].body).toBe("est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla");

                expect(posts[2].userId).toBe(1);
                expect(posts[2].id).toBe(3);
                expect(posts[2].title).toBe("ea molestias quasi exercitationem repellat qui ipsa sit aut");
                expect(posts[2].body).toBe("et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut");
            }
        })

        test('successful call to fetchMultipleUrls: verify results are in the expected order ', async () => {

            const apiUrl1 = 'https://jsonplaceholder.typicode.com/posts/1';
            const apiUrl2 = 'https://jsonplaceholder.typicode.com/posts/2';
            const apiUrl3 = 'https://jsonplaceholder.typicode.com/posts/3';
            const urls = [apiUrl1, apiUrl2, apiUrl3]

            const posts = await testFetchMultipleUrls(urls)
            expect(Array.isArray(posts)).toBe(true);

            if (Array.isArray(posts))
            {
                expect(posts[0].id).toBe(1);
                expect(posts[1].id).toBe(2);
                expect(posts[2].id).toBe(3);
            }
        })

        test('failed call to fetchMultipleUrls', async () => {

            const apiUrl1 = 'https://jsonplaceholder.typicode.com/posts/1';
            const apiUrl2 = 'https://jsonplaceholder.typicode.com/posts/invalid';
            const apiUrl3 = 'https://jsonplaceholder.typicode.com/posts/3';
            const urls = [apiUrl1, apiUrl2, apiUrl3]
            expect(await testFetchMultipleUrls(urls)).toBe(false);
        })

    })
});

