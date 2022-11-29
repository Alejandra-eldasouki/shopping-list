const SUPABASE_URL = 'https://iunwdtvnyfagysjwguun.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml1bndkdHZueWZhZ3lzandndXVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTIyODU4OTQsImV4cCI6MTk2Nzg2MTg5NH0.CfqXGd7NFGJGUzPx4v2oZGFHZXj4mWe7rp7FFmI2YHA';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}
export async function checkAuth() {
    const user = getUser();

    if (!user) location.replace('../');
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}
function checkError({ data, error }) {
    return error ? console.error(error) : data;
}

/* Data functions */
export async function getListItems() {
    const response = await client
        .from('shopping_list')
        .select()
        .match({ user_id: client.auth.user().id });
    return checkError(response);
}

export async function createListItem(item) {
    const response = await client
        .from('shopping_list')
        .insert([{ item: item, complete: false, user_id: client.auth.user().id }]);
    return checkError(response);
}

export async function boughtItem(someId) {
    const response = await client
        .from('shopping_list')
        .update({ bought: true })
        .match({ id: someId });
    return checkError(response);
}
export async function deleteAll() {
    await client.from('shopping_list').delete().match({ user_id: client.auth.user().id });
}
