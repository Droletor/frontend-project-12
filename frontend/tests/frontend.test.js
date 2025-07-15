import { test, expect } from '@playwright/test'

const registeredUser = {
  login: 'admin',
  password: 'admin',
}

const newUser = {
  login: 'testuser',
  password: 'testpassword',
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(300)
})

test.describe('registration', () => {
  test.describe.configure({ mode: 'serial' });
  test('handle new user creation', async ({ page, browserName }) => {
    await page.getByRole('link', { name: 'Регистрация' }).click();
    await page.waitForURL('**/signup')
    await page.getByRole('textbox', { name: 'Имя пользователя' }).fill(newUser.login + browserName)
    await page.getByRole('textbox', { name: 'Пароль', exact: true }).fill(newUser.password + browserName)
    await page.getByRole('textbox', { name: 'Подтвердите пароль' }).fill(newUser.password + browserName)
    await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
    await page.waitForURL('**/')
    await expect(page.getByRole('textbox', { name: 'Новое сообщение' })).toBeVisible();
  })

  test('no duplicated users created', async ({ page, browserName }) => {
    await page.getByRole('link', { name: 'Регистрация' }).click();
    await page.waitForURL('**/signup')
    await page.getByRole('textbox', { name: 'Имя пользователя' }).fill(newUser.login + browserName)
    await page.getByRole('textbox', { name: 'Пароль', exact: true }).fill(newUser.password + browserName)
    await page.getByRole('textbox', { name: 'Подтвердите пароль' }).fill(newUser.password + browserName)
    await page.getByRole('button', { name: 'Зарегистрироваться' }).click();
    await page.waitForURL('**/')
    await expect(page.getByText('Такой пользователь уже существует')).toBeVisible();
  })

  test('handle validation', async ({ page }) => {
    await page.locator('text=Регистрация').first().click()
    await page.waitForURL('**/signup')

    await page.locator('text=Имя пользователя').first().type('u')
    await page.getByRole('textbox', { name: 'Пароль' }).first().type('pass')
    await page.locator('text=Подтвердите пароль').first().type('passw')
    await page.locator('button[type="submit"]').first().click()
    await expect(await page.locator('text=От 3 до 20 символов')).toHaveCount(1)
    await expect(await page.locator('text=Не менее 6 символов')).toHaveCount(1)
    await expect(
      await page.locator('text=Пароли должны совпадать'),
    ).toHaveCount(1)
  })
})

test.describe('auth', () => {
  test('successful login', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Ваш ник' }).first().type(registeredUser.login)
    await page.getByRole('textbox', { name: 'Пароль' }).first().type(registeredUser.password)
    await page.locator('button[type="submit"]').first().click()

    await expect(
      await page.locator('text=Неверные имя пользователя или пароль'),
    ).toHaveCount(0)
  })

  test('handle login error', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Ваш ник' }).click();
    await page.getByRole('textbox', { name: 'Ваш ник' }).fill('imnotregistered');
    await page.getByRole('textbox', { name: 'Пароль' }).click();
    await page.getByRole('textbox', { name: 'Пароль' }).fill('idonthaveapasswordyet');
    await page.getByRole('button', { name: 'Войти' }).click();
    await expect(page.getByText('Неверные имя пользователя или пароль')).toBeVisible();
  })
})

test.describe('chat', () => {
  test.describe.configure({ mode: 'serial' });
  test.beforeEach(async ({ page }) => {
    await page.getByRole('textbox', { name: 'Ваш ник' }).first().type(registeredUser.login)
    await page.getByRole('textbox', { name: 'Пароль' }).first().type(registeredUser.password)
    await page.getByRole('button', { name: 'Войти' }).click();
    await page.getByRole('textbox', { name: 'Новое сообщение' })
  })

  test('messaging', async ({ page }) => {
    await page.getByRole('textbox', { name: 'Новое сообщение' }).click();
    await page.getByRole('textbox', { name: 'Новое сообщение' }).fill('test');
    await page.getByRole('textbox', { name: 'Новое сообщение' }).press('Enter');
    await expect(page.locator('#messages-box')).toContainText('admin: test');
  })

  test('different channels', async ({ page }) => {
    await page
      .locator('[aria-label="Новое сообщение"]')
      .first()
      .type('message for general')
    await page.keyboard.press('Enter')
    await expect(
      await page.locator('text=message for general'),
    ).not.toHaveCount(0)
    await page.locator('text=random').first().click()
    await expect(await page.locator('text=message for general')).toHaveCount(0)
    await page
      .locator('[aria-label="Новое сообщение"]')
      .first()
      .type('message for random')
    await page.keyboard.press('Enter')
    await expect(await page.locator('text=message for random')).not.toHaveCount(
      0,
    )
  })

  test('adding channel', async ({ page, browserName }) => {
    await page.locator('text=+').first().click()
    await page.getByRole('textbox', { name: 'Имя канала' }).fill('test channel' + browserName);
    await page.getByRole('button', { name: 'Отправить', exact: true }).click();

    await expect(page.getByText('Канал создан')).toBeVisible();
    await expect(page.locator('#channels-box')).toContainText('#test channel' + browserName);

    await page.locator('text=+').first().click()
    await page.getByLabel('Имя канала').first().type('test long channel name')
    await page.keyboard.press('Enter')

    await expect(await page.locator('text=От 3 до 20 символов')).toHaveCount(1)
  })

  test('adding channel profanity', async ({ page }) => {
    await page.locator('text=+').first().click()
    await page.getByLabel('Имя канала').first().type('fuck')
    await page.keyboard.press('Enter')

    await expect(await page.getByRole('button', { name: '****' })).not.toHaveCount(0)
  })

  test('rename channel', async ({ page, browserName }) => {
    await page.locator('text="Управление каналом"').first().click()
    await page.locator('text=Переименовать').first().click()
    const input = page.getByLabel('Имя канала')
    await input.fill('')
    await input.first().type(browserName)
    await page.keyboard.press('Enter')

    await expect(await page.locator('text=Канал переименован')).toBeVisible()
    await expect(await page.locator('text=' + browserName)).not.toHaveCount(
      0,
    )
  })

  test('remove channel', async ({ page, browserName }) => {
    await page.locator('text=Управление каналом').first().click()
    await page.locator('text=Удалить').first().click()

    await page.locator('button.btn-danger').first().click()

    await expect(await page.locator('text=Канал удалён')).toBeVisible()

    await page.waitForSelector('.modal', { state: 'hidden' })

    await expect(await page.locator('text=# ' + browserName)).toHaveCount(0)
  })
})