import AuthenticationService from '../../services/AuthenticationService'

/**
 * @jest-environment node
 */

it('Register API testing', async function () {
    const response = await AuthenticationService.register("New", "User", "newUser", "new@user.com", "123aaa");
    console.warn(response);
    expect('User registered successfully!').toEqual(response.data);
});


it('Try to register existing user', async function () {
    var reqFailed = false;
    try {
        await AuthenticationService.register("New", "User", "newUser", "new@user.com", "123aaa");

    } catch (e) {
        reqFailed = true;
    }
    expect(reqFailed).toEqual(true);
});

it('SignIn API testing', async function () {
    const response = await AuthenticationService.signin("new@user.com", "123aaa");
    expect("Bearer").toEqual(response.type);
});

it('SignIn with wrong password', async function () {
    var reqFailed = false;
    try {
        await AuthenticationService.signin("new@user.com", "123123");

    } catch (e) {
        reqFailed = true;
    }
    expect(reqFailed).toEqual(true);

});

it('SignIn with wrong email', async function () {
    var reqFailed = false;
    try {
        await AuthenticationService.signin("new11@user.com", "123aaa");

    } catch (e) {
        reqFailed = true;
    }
    expect(reqFailed).toEqual(true);

});



