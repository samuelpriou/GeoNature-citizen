import { Component, Input, ViewEncapsulation, OnDestroy, ViewChild, ElementRef } from '@angular/core'

import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'

import { IFlowComponent } from '../../flow/flow'
import { RegisterComponent } from 'src/app/auth/register/register.component';
import { LoginComponent } from 'src/app/auth/login/login.component';

@Component({
  templateUrl: './onboard.component.html',
  styleUrls: ['./onboard.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class OnboardComponent implements IFlowComponent, OnDestroy {
  RegistrationModalRef: NgbModalRef
  LoginModalRef: NgbModalRef
  @Input() data: any
  @ViewChild('RegisterComponent') RegisterComponent: ElementRef
  @ViewChild('LoginComponent') LoginComponent: ElementRef

  constructor(private modalService: NgbModal) { }

  ngOnDestroy(): void {
    if (this.data.timeout) {
      clearTimeout(this.data.timeout)
    }
  }

  // Actions
  register() {
    // if not logged_in then stack Register modal dialog ... for now (?)
    // QUESTION: by the end of the registration process, is the user logged in ?
    console.debug('register action > data:', this.data)
    this.RegistrationModalRef = this.modalService.open(RegisterComponent, { centered: true })
    this.RegistrationModalRef.result.then(
      (result) => {
        console.debug('registration resolved:', result)

        // TODO: registered check
        this.data.next()
      },
      (reason) => {
        console.debug('registration dismissed:', reason)
      }
    )
  }

  login() {
    // if not logged_in then stack Login modal dialog
    console.debug('login action > data:', this.data)
    this.LoginModalRef = this.modalService.open(LoginComponent, { centered: true })
    this.LoginModalRef.result.then(
      (result) => {
        console.debug('login resolved:', result)

        // TODO: authenticated check
        this.data.next()

      },
      (reason) => {
        console.debug('login dismissed:', reason)
      }
    )
  }

  continue() {
    console.debug('continue')
    // Continue to Submission form as Anonymous|Registered user
    // TODO: authenticated, anonymous check ... deserves notification ?
    // FIXME: should convey context: create a model/state/store/source of truth
    this.data.next()
  }
}