import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ItemService } from '../../_Services/item.service';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserService } from '../../_Services/user.service';
import { SaveList } from '../../_models/User/SaveList';
import { ToastrService } from 'ngx-toastr';
import { item } from '../../_models/Item/Item';

@Component({
  selector: 'app-item-view',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './item-view.component.html',
  styleUrl: './item-view.component.scss',
})
export class ItemViewComponent implements OnInit {
  itemService = inject(ItemService);
  userService = inject(UserService);
  route = inject(ActivatedRoute);
  private toastr = inject(ToastrService);
  platformId = inject(PLATFORM_ID);
  item: item | null = null;
  isBrowser = false;
  savelist: SaveList = new SaveList();
  ngOnInit() {
    this.isBrowser = isPlatformBrowser(this.platformId);
    console.log('isBrowser:', this.isBrowser);

    //bliver brugt til at hente id fra items i home component
    this.route.params.subscribe((params) => {
      const id = params['id'];
      console.log('Retrieved ID:', id);
      this.get(id); // bruger id til at hente announce fra metoden get
    });
  }

  get(id: number) {
    this.itemService.getOne(id).subscribe({
      next: (response) => {
        this.item = response;
      },
      error: (error) => console.log(error.error),
    });
  }

  Save(id: number = 0) {
    const userstring = localStorage.getItem('user');

    if (userstring) {
      const user = JSON.parse(userstring);
      if (user && user.mail) {
        (this.savelist.userId = user.userId), (this.savelist.itemId = id);
      }

      this.userService.addToSaveList(this.savelist).subscribe({
        next: () => {
          console.log(SaveList);
        },
        error: (error) => this.toastr.error(error.error),
      });
    }
  }
}
