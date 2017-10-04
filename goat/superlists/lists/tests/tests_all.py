from django.urls import resolve
from django.test import TestCase
from django.http import HttpRequest

from lists.views import home_page
from lists.models import Item, List

class HomePageTest(TestCase):

    def test_uses_home_template(self):
        response = self.client.get('/')
        self.assertTemplateUsed(response, 'home.html')


    def test_only_saves_items_when_necessary(self):
        self.client.get('/')
        self.assertEqual(Item.objects.count(), 0)
